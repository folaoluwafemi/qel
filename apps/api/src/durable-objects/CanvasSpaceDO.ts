import { DurableObject } from "cloudflare:workers";

interface CanvasSceneState {
  spaceId: string;
  nodes: any[];
  connectors: any[];
  updatedAt: string;
}

export class CanvasSpaceDO extends DurableObject {
  private sceneState: CanvasSceneState | null = null;

  async initialize() {
    if (!this.sceneState) {
      const stored = await this.ctx.storage.get<CanvasSceneState>("scene_state");
      this.sceneState = stored || {
        spaceId: "default",
        nodes: [],
        connectors: [],
        updatedAt: new Date().toISOString(),
      };
    }
  }

  async fetch(request: Request): Promise<Response> {
    await this.initialize();

    // Upgrade HTTP request to WebSocket
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader === "websocket") {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      // Accept with WebSocket Hibernation
      this.ctx.acceptWebSocket(server);

      // Send initial scene state on connect
      server.send(JSON.stringify({
        type: "INITIAL_SCENE",
        payload: this.sceneState,
      }));

      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }

    // Standard HTTP endpoint for fetching or persisting canvas state
    const url = new URL(request.url);
    if (request.method === "GET") {
      return Response.json(this.sceneState);
    }

    if (request.method === "POST") {
      const update = await request.json<Partial<CanvasSceneState>>();
      this.sceneState = {
        ...this.sceneState!,
        ...update,
        updatedAt: new Date().toISOString(),
      };
      await this.ctx.storage.put("scene_state", this.sceneState);
      return Response.json({ success: true, scene: this.sceneState });
    }

    return new Response("Not found", { status: 404 });
  }

  // WebSocket Hibernation Event Handlers
  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    if (typeof message !== "string") return;

    try {
      const event = JSON.parse(message);

      // Update state
      if (event.type === "UPDATE_NODE") {
        const nodeIndex = this.sceneState?.nodes.findIndex((n) => n.id === event.payload.id);
        if (nodeIndex !== undefined && nodeIndex >= 0) {
          this.sceneState!.nodes[nodeIndex] = { ...this.sceneState!.nodes[nodeIndex], ...event.payload };
        } else {
          this.sceneState?.nodes.push(event.payload);
        }
      } else if (event.type === "ADD_CONNECTOR") {
        this.sceneState?.connectors.push(event.payload);
      }

      // Broadcast to all other connected clients
      for (const client of this.ctx.getWebSockets()) {
        if (client !== ws) {
          client.send(message);
        }
      }

      // Persist state in background
      await this.ctx.storage.put("scene_state", this.sceneState);
    } catch (err) {
      console.error("CanvasSpaceDO message error:", err);
    }
  }

  async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
    ws.close(code, "Closed by client");
  }
}

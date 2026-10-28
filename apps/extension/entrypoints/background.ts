export default defineBackground(() => {
  const API_ENDPOINT = "https://qel-api.folabuilds.workers.dev/api/v1/artifacts";

  // Register context menus upon installation
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "qel-save-page",
      title: "Save page to Qel",
      contexts: ["page"],
    });

    chrome.contextMenus.create({
      id: "qel-save-selection",
      title: "Save selection to Qel",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "qel-save-image",
      title: "Pin image to Qel",
      contexts: ["image"],
    });
  });

  // Handle Context Menu clicks
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    let payload: Record<string, any> = {
      userId: "user_owner",
      recordedAt: new Date().toISOString(),
    };

    if (info.menuItemId === "qel-save-selection" && info.selectionText) {
      payload = {
        ...payload,
        modality: "raw_note",
        title: tab?.title || "Web Selection",
        rawText: `"${info.selectionText}"\n\nSource: ${tab?.url}`,
        sourceUrl: tab?.url,
        autoTags: ["browser-selection"],
      };
    } else if (info.menuItemId === "qel-save-image" && info.srcUrl) {
      payload = {
        ...payload,
        modality: "visual_pin",
        title: tab?.title || "Web Image Pin",
        r2MediaUrl: info.srcUrl,
        sourceUrl: tab?.url,
        autoTags: ["browser-pin"],
      };
    } else {
      payload = {
        ...payload,
        modality: "web_clipping",
        title: tab?.title || "Web Bookmark",
        sourceUrl: tab?.url,
        autoTags: ["web-bookmark"],
      };
    }

    try {
      await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to save artifact to Qel API:", err);
    }
  });

  // Handle Global Keyboard Shortcut (Cmd/Ctrl + Shift + S)
  chrome.commands.onCommand.addListener(async (command) => {
    if (command === "capture_page") {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!activeTab || !activeTab.url) return;

      const payload = {
        userId: "user_owner",
        recordedAt: new Date().toISOString(),
        modality: "web_clipping",
        title: activeTab.title || "Quick Web Bookmark",
        sourceUrl: activeTab.url,
        autoTags: ["omni-captured"],
      };

      try {
        await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Omni-capture failed:", err);
      }
    }
  });
});

FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Step 1: Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/core/package.json ./packages/core/
COPY packages/design-system/package.json ./packages/design-system/
COPY packages/database/package.json ./packages/database/
COPY packages/ai-router/package.json ./packages/ai-router/
COPY packages/features/visual-stream/package.json ./packages/features/visual-stream/
COPY packages/features/infinite-canvas/package.json ./packages/features/infinite-canvas/
COPY packages/features/thought-graph/package.json ./packages/features/thought-graph/
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile

# Step 2: Build the standalone bundle
FROM deps AS builder
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @qel/web build

# Step 3: Production runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]

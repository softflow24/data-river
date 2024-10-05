# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.10.0

# Copy package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml lerna.json .npmrc ./
COPY packages/client/package.json ./packages/client/
COPY packages/editor/package.json ./packages/editor/
COPY packages/execution-engine/package.json ./packages/execution-engine/
COPY packages/shared/package.json ./packages/shared/
COPY packages/blocks/package.json ./packages/blocks/

# Set shamefully-hoist to true
RUN echo "shamefully-hoist=true" >> .npmrc

# Install all dependencies at the project level, skipping the prepare script
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source files
COPY . .

# Navigate to client directory
WORKDIR /app/packages/client

# Build the client frontend
RUN pnpm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.10.0

# Copy package files and install dependencies
COPY --from=builder /app/pnpm-workspace.yaml /app/package.json /app/pnpm-lock.yaml /app/lerna.json /app/.npmrc ./
COPY --from=builder /app/packages/client/package.json ./packages/client/
COPY --from=builder /app/packages/editor/package.json ./packages/editor/
COPY --from=builder /app/packages/execution-engine/package.json ./packages/execution-engine/
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/packages/blocks/package.json ./packages/blocks/
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy built assets from builder stage
COPY --from=builder /app/packages/client/build ./packages/client/build
COPY --from=builder /app/packages/client/public ./packages/client/public

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the client server
CMD ["pnpm", "run", "--filter", "@data-river/client", "start"]
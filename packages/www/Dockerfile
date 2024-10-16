# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.12.1

# Copy package files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml lerna.json .npmrc ./
COPY packages/www/package.json ./packages/www/

# Install all dependencies at the project level, skipping the prepare script
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source files
COPY . .

# Navigate to www directory
WORKDIR /app/packages/www

# Build the www frontend
RUN pnpm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.12.1

# Copy package files and install dependencies
COPY --from=builder /app/pnpm-workspace.yaml /app/package.json /app/pnpm-lock.yaml /app/lerna.json /app/.npmrc ./
COPY --from=builder /app/packages/www/package.json ./packages/www/
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy built assets from builder stage
COPY --from=builder /app/packages/www/build ./packages/www/build
COPY --from=builder /app/packages/www/public ./packages/www/public

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the www server
CMD ["pnpm", "run", "--filter", "@data-river/www", "start"]
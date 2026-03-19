# ---- Builder stage ----
FROM node:18.18.2-alpine AS builder
WORKDIR /app

# Copy dependency definitions
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
  else echo "No lockfile found!" && exit 1; \
  fi

# Copy all source code
COPY . .

# Build with Railway-injected environment variables
RUN npm run build

# ---- Runtime stage ----
FROM node:18.18.2-alpine AS runner
WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Copy built app from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

# Start the app using standalone output
CMD ["node", "server.js"]

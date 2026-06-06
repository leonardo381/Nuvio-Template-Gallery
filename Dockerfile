# ---------- Build stage ----------
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .

# VITE_* values are browser-exposed and must be provided at image build time.
RUN npm run prepare && npm run build

# ---------- Runtime stage ----------
FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["npm", "run", "start"]

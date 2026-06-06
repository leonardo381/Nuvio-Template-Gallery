# ---------- Build stage ----------
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .

# VITE_* values are browser-exposed and must be provided at image build time.
ARG VITE_PB_URL=http://localhost:8090
ARG VITE_NUVIO_BACKEND_URL=http://localhost:8090
ARG VITE_PUBLIC_SITE_BASE_URL=http://localhost:3000
ARG VITE_CMS_PREVIEW_PARENT_ORIGIN=http://localhost:8090
ENV VITE_PB_URL=$VITE_PB_URL
ENV VITE_NUVIO_BACKEND_URL=$VITE_NUVIO_BACKEND_URL
ENV VITE_PUBLIC_SITE_BASE_URL=$VITE_PUBLIC_SITE_BASE_URL
ENV VITE_CMS_PREVIEW_PARENT_ORIGIN=$VITE_CMS_PREVIEW_PARENT_ORIGIN
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

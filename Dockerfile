# Stage 1: Build the React app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps to handle conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Set environment variable for OpenSSL legacy provider
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the app
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy startup script
COPY start-nginx.sh /start-nginx.sh
RUN chmod +x /start-nginx.sh

# Expose port (default to 80, Railway will override with PORT env var)
EXPOSE 80

# Start nginx with dynamic port configuration
CMD ["/start-nginx.sh"]


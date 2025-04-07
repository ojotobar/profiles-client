# Use official Node image for building
FROM node:20 AS build

WORKDIR /app
COPY . .

# Install dependencies & build Angular app
RUN npm install && npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy built Angular app
COPY --from=build /app/dist/pro-files /usr/share/nginx/html

# Copy NGINX default config (optional, only if you’re customizing nginx.conf)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Run the entrypoint
ENTRYPOINT ["/entrypoint.sh"]
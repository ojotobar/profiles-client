# ===========================
# Stage 1: Build Angular app
# ===========================
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=production

# ===========================
# Stage 2: Serve with NGINX
# ===========================
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/pro-files .       

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
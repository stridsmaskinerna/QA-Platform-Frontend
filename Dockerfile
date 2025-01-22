FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# "nginx -g daemon off" forces NGINX to run in the foreground,
# which is a Docker requirement to keep the container alive.
CMD ["nginx", "-g", "daemon off;"]

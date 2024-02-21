# Build React App
FROM node:17-alpine as builder
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build


# Run NGINX File
FROM nginx:1.21.3-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
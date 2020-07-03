FROM node:14.5.0-alpine3.12 as build-stage
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0-alpine as serve-stage
RUN apk --update add --no-cache bind-tools
COPY --from=build-stage /src/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

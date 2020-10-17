FROM node:9.11.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./docker/config/local.conf /etc/nginx/conf.d/local.conf
COPY ./docker/config/status.conf /etc/nginx/conf.d/status.conf
COPY ./docker/entrypoint.sh ./entrypoint.sh

RUN rm /etc/nginx/conf.d/default.conf

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]
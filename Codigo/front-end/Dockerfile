FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install -g expo-cli && npm install
ADD . .

FROM builder as packager
RUN expo-cli build:web

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=packager /usr/src/app/web-build .

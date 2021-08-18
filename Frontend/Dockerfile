FROM node:14 AS build

WORKDIR /project
COPY package.json /project/package.json
COPY package-lock.json /project/package-lock.json

RUN npm install -g @angular/cli@12.2.1
RUN npm ci

COPY . /project

RUN ng build

FROM nginx:1.13-alpine
COPY --from=build project/dist/atypikhouse /usr/share/nginx/html

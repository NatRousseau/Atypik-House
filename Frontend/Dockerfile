FROM node:10 AS build

WORKDIR /project
COPY package.json /project/package.json
COPY package-lock.json /project/package-lock.json

RUN npm install -g @angular/cli@11.1.4
RUN npm ci

COPY . /project

RUN ng build

FROM nginx:1.13-alpine
COPY --from=build project/dist/atypikhouse /usr/share/nginx/html

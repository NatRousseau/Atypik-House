FROM node:14 AS build

WORKDIR /project
COPY package.json /project/package.json
#COPY package-lock.json /project/package-lock.json

RUN npm install -g @angular/cli@12.2.2
RUN npm i -D typescript@4.3.5
RUN npm install

COPY . /project

RUN ng build

FROM nginx:1.13-alpine
COPY --from=build project/dist/atypikhouse /usr/share/nginx/html
COPY robot.txt /usr/share/nginx/html/robot.txt
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY default.conf /etc/nginx/conf.d/default.conf

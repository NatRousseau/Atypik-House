FROM node:10 AS development

WORKDIR /project
COPY package.json /project/package.json
COPY package-lock.json /project/package-lock.json

RUN npm install -g @angular/cli@11.1.4
RUN npm ci

COPY . /project

CMD ["ng", "serve"]

FROM development AS builder

CMD ["ng", "build"]

FROM nginx:1.13-alpine
COPY --from=builder project/dist/atypikhouse /usr/share/nginx/html

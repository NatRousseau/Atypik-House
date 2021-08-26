FROM node:14 AS build

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /code

ARG PORT=4500
ENV PORT $PORT
EXPOSE $PORT 9229 9230

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
#COPY healthcheck.js /code/healthcheck.js
RUN npm ci

HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

RUN npm i knex -g

COPY . /code

CMD [ "node", "server.js" ]

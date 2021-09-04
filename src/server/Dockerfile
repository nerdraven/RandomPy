FROM node:16.0.0-slim as builder

WORKDIR /usr/src/app

COPY *.json /usr/src/app/
COPY yarn.lock .
COPY package.json .
RUN yarn

COPY src src
RUN yarn build

FROM node:16.0.0-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist/server .
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/node_modules/ node_modules/

ENTRYPOINT [ "yarn", "start" ]
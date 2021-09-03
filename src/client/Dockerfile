FROM node:14-slim as builder

ARG DEV=1
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY src src
COPY public public
COPY tsconfig.json .
COPY .eslintrc.json .
RUN yarn build

FROM nginx:1.9.9

ENV NGINX_ENTRYPOINT_QUIET_LOGS $DEV

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]

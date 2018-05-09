ARG runtimeBase=leonardpauli/docs-nginx-base:latest
ARG imageWithSha=node:9.11-alpine@sha256:5149aec8f508d48998e6230cdc8e6832cba192088b442c8ef7e23df3c6892cd3
FROM $imageWithSha as build-base

# // dev
FROM $runtimeBase as dev
COPY --from=build-base /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=build-base /usr/local/include/node /usr/local/include/node
COPY --from=build-base /usr/lib/* /usr/lib/
COPY --from=build-base /usr/local/bin/node /usr/local/bin/
RUN ln -s ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

ARG npm_config_registry
VOLUME /app
VOLUME /app/node_modules
VOLUME /root/.npm
VOLUME /data
WORKDIR /app
EXPOSE 8080
CMD npm run dev & (cd /app-nginx && ./entrypoint.sh)

# // lib
# builder
FROM $imageWithSha as builder-installer
WORKDIR /app
COPY web/package.json web/package-lock.json /app/

ARG npm_config_registry
ENV npm_config_registry=$npm_config_registry
RUN npm install --no-optional

FROM $imageWithSha as builder
COPY --from=builder-installer /app/node_modules /tmp/node_modules
COPY . /app
RUN cp -rf /tmp/node_modules /app/web/node_modules \
	&& (export NODE_ENV=production; cd /app/web && npm run build)

# target: prod
FROM $runtimeBase as prod
COPY --from=builder /app/web/dist /app/dist
COPY web/container/nginx /app-nginx/nginx
VOLUME /data

## runtime
#FROM $imageWithSha as prod
#COPY --from=builder /app/lib /app/lib
#VOLUME /data
#WORKDIR /app
#CMD ["node", "lib/index.js"]


# # // alt for dist with prod deps
# # prod-deps-installer
# FROM $imageWithSha as prod-deps-installer
# WORKDIR /app
# COPY ./package.json ./package-lock.json /app/

# ARG npm_config_registry
# ENV npm_config_registry=$npm_config_registry
# RUN export NODE_ENV=production; npm install

# # server
# FROM $imageWithSha as prod
# WORKDIR /app
# COPY --from=prod-deps-installer /app/node_modules /app/node_modules
# COPY --from=builder /app/dist /app/dist
# ENV NODE_ENV=production
# CMD ["node", "lib/index.js"]


# # // alt for pure dist
# # server
# FROM ... as prod
# COPY --from=builder /app/dist /app/dist
# CMD ["simple-server", "/app/dist"]

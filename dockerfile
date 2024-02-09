# build stage
FROM node:lts-alpine as build-stage

# Install git
RUN apk add --no-cache git

WORKDIR /temp

# Copying package files and installing dependencies
COPY package.json yarn.lock .
RUN yarn config set registry https://registry.npmmirror.com/ && \
    yarn install --frozen-lockfile && \
    yarn cache clean

# Copying source files and building the application
COPY . .
RUN yarn build

# production stage
FROM node:lts-alpine as production-stage

WORKDIR /app

# Copying only necessary files from build-stage
COPY --from=build-stage /temp/next.config.js ./next.config.js
COPY --from=build-stage /temp/public ./public
COPY --from=build-stage /temp/.next ./.next
COPY --from=build-stage /temp/src/markdown ./src/markdown
COPY --from=build-stage /temp/package.json ./package.json
COPY --from=build-stage /temp/yarn.lock ./yarn.lock
COPY --from=build-stage /temp/project.config.js ./project.config.js

# Installing only production dependencies
RUN yarn config set registry https://registry.npmmirror.com/  && \
    yarn install --production --frozen-lockfile  && \
    yarn cache clean

# Exposing the right port
EXPOSE 3000

# Starting the application
CMD [ "yarn", "start" ]

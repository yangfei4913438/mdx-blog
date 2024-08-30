# build stage
FROM node:20-alpine as build-stage

WORKDIR /temp

# Copying package files and installing dependencies
COPY package.json package-lock.json .
RUN npm install --registry=https://registry.npmmirror.com/ --frozen-lockfile && \
    npm cache clean --force

# Copying source files and building the application
COPY . .
RUN npm run build

# production stage
FROM node:20-alpine as production-stage

WORKDIR /app

# Copying only necessary files from build-stage
COPY --from=build-stage /temp/next.config.js ./next.config.js
COPY --from=build-stage /temp/public ./public
COPY --from=build-stage /temp/.next ./.next
COPY --from=build-stage /temp/src/markdown ./src/markdown
COPY --from=build-stage /temp/package.json ./package.json
COPY --from=build-stage /temp/package-lock.json ./package-lock.json
COPY --from=build-stage /temp/project.config.js ./project.config.js

# Installing only production dependencies
RUN npm install --registry=https://registry.npmmirror.com/ --only=production && \
    npm cache clean --force

# Exposing the right port
EXPOSE 3000

# Starting the application
CMD [ "npm", "run", "start" ]

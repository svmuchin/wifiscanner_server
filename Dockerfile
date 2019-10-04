FROM node:carbon AS base
WORKDIR /server

FROM base AS dependencies
COPY package*.json ./
RUN npm install

FROM dependencies AS build
WORKDIR /server
COPY src /server
RUN npm run build

FROM node:alpine AS release
WORKDIR /server
ARG DEVELOPMENT

COPY --from=dependencies /server/package.json ./
RUN if [ $DEVELOPMENT ]; \
        then npm install; \
        else npm install --only=production; \
    fi
COPY --from=build /server ./
#RUN ls -1

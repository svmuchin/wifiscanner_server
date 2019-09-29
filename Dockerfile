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

COPY --from=dependencies /server/package.json ./
RUN npm install --only=production
COPY --from=build /server ./

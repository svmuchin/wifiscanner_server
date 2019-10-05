FROM node:carbon
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY src ./src

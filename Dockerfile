FROM node:carbon
WORKDIR /server
COPY ["package.json", "package-lock.json", "server", "./"]
RUN npm install

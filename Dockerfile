FROM node:carbon

WORKDIR /server

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY src /server

EXPOSE $PORT
CMD [ "nodemon" ]
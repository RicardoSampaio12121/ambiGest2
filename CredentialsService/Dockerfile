FROM node:alpine
ADD createDB.sql /docker/entry-point-initdb.d/
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
# CMD [ "npm", "start" ]
CMD [ "npm", "run", "dev" ]
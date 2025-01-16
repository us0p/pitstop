FROM node:23 AS builder
WORKDIR /app
COPY . .
RUN npm i
RUN apt update && apt install sqlite3
CMD npm start

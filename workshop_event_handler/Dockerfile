FROM node:23 as builder
WORKDIR /app
COPY . .
RUN npm i

FROM node:23-alpine as final-stage
WORKDIR /app
COPY --from=builder /app /app
CMD npm start

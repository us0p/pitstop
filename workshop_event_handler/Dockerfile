FROM node:23 AS builder
WORKDIR /app
COPY . .
RUN npm i

FROM node:23-alpine AS final-stage
WORKDIR /app
COPY --from=builder /app /app
CMD npm start

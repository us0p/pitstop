FROM node:23 AS builder
WORKDIR /app
COPY . . 
RUN npm i

FROM node:23-alpine AS final
WORKDIR /app
COPY --from=builder /app .
CMD npm start

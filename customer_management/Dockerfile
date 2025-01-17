FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm i
ENTRYPOINT npx prisma migrate deploy && npx prisma generate && npm run start:dev

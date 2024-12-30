FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i
COPY prisma src .env tsconfig.json tsconfig.build.json ./
ENTRYPOINT npx prisma migrate deploy && npx prisma generate && npm run start:dev

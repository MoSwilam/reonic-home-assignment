FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN npm install -g @nestjs/cli
COPY src .  

RUN pnpm install -

CMD ["node", "src/app.js"] 

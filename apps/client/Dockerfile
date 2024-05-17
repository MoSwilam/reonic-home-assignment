FROM node:alpine

WORKDIR /app

COPY apps/client/package.json apps/client/yarn.lock ./

RUN yarn install

COPY apps/client ./

RUN yarn build

CMD ["yarn", "start"]
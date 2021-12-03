FROM node:17-alpine

WORKDIR /app

COPY package*.json .

RUN corepack enable
RUN yarn install

COPY . /app

ENV PORT=3000

EXPOSE 3000

CMD [ "yarn", "start" ]
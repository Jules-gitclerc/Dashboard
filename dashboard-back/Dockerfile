FROM node:17-alpine

WORKDIR /app

COPY package*.json .

RUN corepack enable
RUN yarn install

COPY . /app

ENV PORT=8080

EXPOSE 8080

CMD [ "yarn", "start" ]
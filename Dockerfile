FROM alpine:3.4

RUN apk add --no-cache nodejs git

WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

RUN npm run compile

EXPOSE 3000

CMD node js/index.js
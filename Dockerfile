FROM node:14-alpine

RUN apk add --no-cache imagemagick ffmpeg graphicsmagick

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json ./

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

COPY . .

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]

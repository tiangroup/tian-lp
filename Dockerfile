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

VOLUME /app/content /app/static

ENV HOST 0.0.0.0
EXPOSE 3000

COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

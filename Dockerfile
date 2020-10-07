FROM node:14-alpine

#RUN apk add --no-cache imagemagick ffmpeg graphicsmagick
RUN apk add --no-cache graphicsmagick \
    && apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ 

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]

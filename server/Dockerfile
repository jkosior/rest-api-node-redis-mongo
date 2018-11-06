FROM node:latest

WORKDIR /api

COPY ./package.json ./

RUN npm i

COPY . ./

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

ENV NODE_ENV=production

CMD /wait && npm start

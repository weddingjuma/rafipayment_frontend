FROM node:boron

RUN mkdir -p /app
WORKDIR /app

ADD package.json /app/

RUN npm install

ADD . /app

EXPOSE 8080

CMD ["npm", "run", "build"]

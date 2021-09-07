FROM node:14
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

ENV NODE_ENV production
CMD [ "npm", "start" ]
USER node
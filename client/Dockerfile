FROM node:14
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN chmod a+x /usr/src/app/build

ENV NODE_ENV production
RUN npm run build

RUN chmod -R 777 /usr/src/app/build

CMD [ "npm", "run", "start:prod" ]
USER node
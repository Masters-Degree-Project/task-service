FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG SERVICE_PORT=3000
ENV SERVICE_PORT=$SERVICE_PORT
EXPOSE ${SERVICE_PORT}

CMD ["npm", "run", "start:prod"] 
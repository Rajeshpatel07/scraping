FROM node:22-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm","start"]

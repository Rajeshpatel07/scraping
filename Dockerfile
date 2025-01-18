FROM node:22-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm","start"]

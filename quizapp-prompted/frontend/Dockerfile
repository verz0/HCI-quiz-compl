FROM node:18.2.0

WORKDIR /usr/src/frontend2

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8848

CMD ["npm", "start"]

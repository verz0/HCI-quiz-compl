FROM node:18.2.0

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8844

CMD ["npm", "start"]

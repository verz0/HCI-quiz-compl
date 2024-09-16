FROM node:18.2.0

WORKDIR /usr/src/frontend1

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8846

CMD ["npm", "start"]

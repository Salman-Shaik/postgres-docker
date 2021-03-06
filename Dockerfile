FROM node:8

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

ENTRYPOINT [ "npm", "run", "nodemon" ]

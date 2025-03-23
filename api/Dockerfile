FROM node:18.20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY . /app/

EXPOSE 4000

CMD ["npm", "run", "start"]
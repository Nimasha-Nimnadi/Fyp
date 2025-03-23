#build image
from node:18.20-alpine as build_image

#declare build time environment variables
#ARG SERVER_BASE_URL

#set defaul values for environment variables
#ENV SERVER_BASE_URL=$SERVER_BASE_URL

#build app
WORKDIR /app/react-app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build 


#production image
from nginx:stable-alpine3.20 as production_image

WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build_image /app/react-app/dist . 

WORKDIR /etc/nginx/conf.d
COPY --from=build_image /app/react-app/nginx-config/default.conf .

WORKDIR /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


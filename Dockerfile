#Build application 
FROM node:13.13 as node
WORKDIR /app    
COPY package*.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

#Run application 
FROM nginx:1.15
COPY --from=node /app/dist/inventario /usr/share/nginx/html
COPY --from=node /app/nginx.conf /etc/nginx/conf.d/default.conf

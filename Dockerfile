# FROM node:13-alpine as builder

# COPY package.json package-lock.json ./

# RUN npm install && mkdir /app && mv ./node_modules ./app

# WORKDIR /app

# COPY . .

# RUN npm run ng build -- --deploy-url=/envapp/ --prod


# FROM nginx:alpine

# #!/bin/sh

# COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE 4200 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]




# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:13.13 as node
WORKDIR /app    
COPY package*.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:1.15
COPY --from=node /app/dist/inventario /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/nginx.conf /etc/nginx/conf.d/default.conf

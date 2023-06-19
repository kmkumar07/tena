FROM node:18.16.0-alpine as builder
WORKDIR /app
COPY . /app
RUN npm i
RUN npm install -g @angular/cli
RUN ng build:dev


FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/tenant-portal /usr/share/nginx/html/
COPY /default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
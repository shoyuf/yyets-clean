FROM nginx:stable
COPY ./dist /usr/share/nginx/html
EXPOSE 7003
FROM nginx

LABEL maintainer="zhangchaojie<1098626505@qq.com>"

COPY ./dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

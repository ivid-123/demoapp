FROM nginx:mainline-alpine

RUN echo $(ls /etc/nginx/)
RUN echo $(ls /usr/share/nginx/)
RUN echo $(ls /usr/local/nginx/)
RUN echo $(ls /usr/local/etc/nginx)
RUN echo $(ls /etc/nginx/)
## Copy our nginx config
COPY config/nginx/ /etc/nginx/conf.d/
COPY config/nginx/ /usr/share/nginx/conf.d/
COPY config/nginx/ /usr/local/nginx/conf
COPY config/nginx/ /etc/nginx
COPY config/nginx/ /usr/local/etc/nginx

## Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*
RUN echo $(ls /config/nginx/)
RUN echo $(ls /dist/VideoTool)
## copy over the artifacts in dist folder to default nginx public folder
COPY dist/VideoTool/ /usr/share/nginx/html


# --- Nginx Setup ---
COPY config/nginx/default.conf /etc/nginx/conf.d/
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chgrp -R root /var/cache/nginx
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
RUN addgroup nginx root

#-----printing-------
RUN echo $(echo 'printing nginx default public html folder')
RUN echo $(ls /usr/share/nginx/html)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
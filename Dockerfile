FROM nginx:alpine
ENV PORT=80
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY index.html style.css games.js chat.js app.js /usr/share/nginx/html/
EXPOSE 80

FROM node:20
WORKDIR /app
COPY . .
RUN npm install
COPY .env .env.production
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]
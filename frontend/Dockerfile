FROM node:20
WORKDIR /app
COPY .env .env.production
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]
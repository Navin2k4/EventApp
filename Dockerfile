FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

RUN npm run build

CMD ["npm","start"]

EXPOSE 3000

# docker build -t my-next-app .

# docker run -p 3000:3000 my-next-app

# docker tag eventapp yourusername/eventapp:latest
# docker tag eventapp navinkumaran/event_application:latest
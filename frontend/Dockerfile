FROM node:20.11.1-alpine3.19
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

# ARG APP_API_BASE_URL
# ENV APP_API_BASE_URL=${APP_API_BASE_URL}

RUN npm run build

EXPOSE 5010

CMD ["npm" , "run", "dev"]
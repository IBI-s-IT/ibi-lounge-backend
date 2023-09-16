FROM node:18.17.0-alpine

EXPOSE 8000

WORKDIR /app
COPY . ./
RUN yarn --frozen-lockfile

CMD ["yarn", "start"]

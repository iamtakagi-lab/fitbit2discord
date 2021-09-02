FROM node:16

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn
COPY . /app/
RUN yarn parcel build --target node src/index.ts
COPY ./dist/ /app/

CMD [ "node", "dist/index.js" ]
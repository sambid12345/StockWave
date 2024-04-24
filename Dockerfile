ARG NODE_VERSION=18.20.2
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /InvUI
COPY . /InvUI
RUN npm install
EXPOSE 4200:4200
CMD [ "npm", "run", "start:prod"]
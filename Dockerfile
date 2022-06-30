# Base image used 
# FROM node:16.15.1-alpine:3.15
# ENV NODE_VERSION 16.15.1
FROM node:alpine

WORKDIR /usr/app
COPY package*.json ./

# Installing project dependencies
RUN npm install

COPY . .
EXPOSE 3001
# Running default command 
CMD ["npm", "start"]
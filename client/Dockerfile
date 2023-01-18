# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /pin-app

# Installing dependencies
COPY ./client/package.json /pin-app
RUN npm install

# Copying all the files in our project
COPY ./client/ .

# Starting our application
CMD npm start
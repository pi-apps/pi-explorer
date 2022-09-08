# Source: https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/
# Multi-stage
# 1) Node image for building app assets
# 2) nginx stage to serve app assets

FROM node:13-alpine AS base

# Set working directory
WORKDIR /home/app

# Copy our node modules specification
COPY ./package.json .
COPY ./package-lock.json .

# Install node modules and build assets
RUN npm install

#Copy all files from current directory to working dir in image
COPY . .

# Create a build of the app
RUN npm run build

# nginx state for serving content
FROM nginx:alpine

EXPOSE 80

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=base /home/app/build .

COPY ./docker/nginx-defaults.conf /etc/nginx/conf.d/default.conf

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
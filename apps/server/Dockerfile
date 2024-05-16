# Use an official Node.js image as a base
FROM node:alpine

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the server application code
COPY apps/server ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]
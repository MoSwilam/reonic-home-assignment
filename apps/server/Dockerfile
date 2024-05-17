FROM node:alpine as development

# Create the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Copy configuration files
COPY tsconfig.json ./tsconfig.json
COPY nest-cli.json ./nest-cli.json

# Copy the rest of the server application code
COPY apps/server ./apps/server
COPY libs ./libs

# Install dependencies
RUN yarn install

# Build the application
RUN yarn run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

# Install only production dependencies
RUN yarn install --production

COPY apps/server .

# Copy the build output from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Command to run the application
CMD ["node", "dist/apps/server/main"]
# Use Node.js 14 version as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g @vue/cli-service
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Command to serve the app
CMD ["npm", "run", "serve"]

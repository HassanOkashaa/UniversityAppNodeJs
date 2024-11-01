# Use Node.js 20 as the base image (or your preferred version)
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install the dependencies (including bcrypt) inside the container
RUN npm install

# Now copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]

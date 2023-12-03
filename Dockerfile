FROM node:20

# Copy source files
WORKDIR /app
COPY package.json package-lock.json yarn.lock /app/
COPY src /app/src

# Install libraries
RUN yarn install

# Start yaruo
CMD ["node", "src/main.mjs"]

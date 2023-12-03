FROM node:20

# Copy source files
WORKDIR /app
# COPY package.json yarn.lock /app/
COPY package.json /app/
COPY src /app/src

# Install libraries
RUN yarn install

# Start yaruo
CMD ["node", "src/main.mjs"]

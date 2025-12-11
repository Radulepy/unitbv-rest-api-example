# Use official Node LTS
FROM node:20-alpine

# Workdir
WORKDIR /usr/src/app

# Install deps (use package*.json for npm v5+)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Expose app port
EXPOSE 3000

# Environment defaults (can be overridden)
ENV PORT=3000 \
    DB_CLIENT=mysql \
    MYSQL_HOST=mysql \
    MYSQL_USER=root \
    MYSQL_PASSWORD= \
    MYSQL_DATABASE=todo_db \
    MQ_HOST=activemq \
    MQ_PORT=61613 \
    MQ_USER=admin \
    MQ_PASSWORD=admin \
    JWT_SECRET=dev_secret_change_me \
    JWT_EXPIRES_IN=1h

# Start
CMD ["npm", "start"]
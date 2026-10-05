# demo-app/Dockerfile
#
# The platform requires every deployed repository to contain a Dockerfile at its
# root. This one installs the app's dependencies and runs it on port 3000 —
# the same APP_PORT the Jenkins pipeline passes (APP_PORT=3000).

FROM node:20-alpine

WORKDIR /app

# Copy manifests first so this layer is cached when only source code changes.
COPY package*.json ./
RUN npm install --omit=dev

# Then the application code.
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]

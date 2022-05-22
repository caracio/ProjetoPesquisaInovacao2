FROM node:16 
WORKDIR /app-node
COPY . .
RUN npm install
ENTRYPOINT npm startadd
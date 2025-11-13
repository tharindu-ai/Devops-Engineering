FROM node:22.14.0

WORKDIR /app

COPY package.json ./
RUN npm install

# copy app source
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
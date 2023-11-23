FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build catalog

CMD [ "node", "dist/src/main" ]
CMD [ "npx", "prisma", "migrate", "dev" ]
CMD [ "npm", "run", "start:migrate:docker" ]
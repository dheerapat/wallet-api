FROM node:18.17.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV ENV=dev
ENV DATABASE_URL=file:./dev.db
ENV TOKEN_SECRET=top-secret
ENV PORT=3000

RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["npm", "run", "dev"]
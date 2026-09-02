FROM node:22-alpine

WORKDIR /app

COPY services/ai-service/package*.json ./

RUN npm ci

COPY services/ai-service/tsconfig.json ./
COPY services/ai-service/src ./src

COPY data ./data

RUN npm run build

EXPOSE 4005

CMD ["npm", "start"]

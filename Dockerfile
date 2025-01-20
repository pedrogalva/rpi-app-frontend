# Usa uma imagem base leve do Node.js
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src/
COPY build/ ./build/

# Instala dependências
RUN npm install

# Compila os arquivos TypeScript
RUN npx tsc

# Expõe a porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "dist/server.js"]

# Etapa 1: Build
FROM node:20 AS build

# Definir o diretório de trabalho
WORKDIR /leitor_rpi_frontend

# Copiar arquivos de configuração
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código-fonte
COPY . .

# Gerar a build da aplicação
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copiar a build gerada para a pasta de arquivos estáticos do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração customizada do Nginx, se necessário (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

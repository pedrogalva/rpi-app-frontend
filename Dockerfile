# Etapa 1: Construir o React App
FROM node:20 as build
WORKDIR /app

# Copiar arquivos necessários para o build
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

# Construir a aplicação React
# RUN npm run build

# Etapa 2: Configurar o Nginx para servir os arquivos
FROM nginx:stable-alpine AS production

# Remover configurações padrão do Nginx e copiar o build do React
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

# Configurar o Nginx para lidar com React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Iniciar o Nginx em modo foreground
CMD ["nginx", "-g", "daemon off;"]

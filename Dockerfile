# # Etapa 1: Build
# FROM node:20 AS build

# # Definir o diretório de trabalho
# WORKDIR /leitor_rpi_frontend

# # Copiar arquivos de configuração
# COPY package.json package-lock.json ./

# # Instalar dependências
# RUN npm install

# # Copiar todo o código-fonte
# COPY . .

# # Instalar dependência adicional necessária
# RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# # Gerar a build da aplicação
# RUN npm run build

# # Etapa 2: Servir com Nginx
# FROM nginx:alpine

# # Copiar a build gerada para a pasta de arquivos estáticos do Nginx
# COPY --from=build /leitor_rpi_frontend/build /usr/share/nginx/html

# # Expor a porta 3000
# EXPOSE 3000

# # Comando para iniciar o Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Servir com Nginx
FROM nginx:alpine

# Copiar a build gerada localmente para a pasta de arquivos estáticos do Nginx
COPY build /usr/share/nginx/html

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

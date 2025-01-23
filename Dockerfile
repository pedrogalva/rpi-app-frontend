# Etapa 1: Construir o React App
FROM node:20 as build
WORKDIR /app

# Copiar os arquivos necessários para instalar dependências
COPY package.json ./

# Instalar dependências
# RUN yarn install

# # Instalar dependência adicional necessária
# RUN yarn add -D @babel/plugin-proposal-private-property-in-object

# Copiar o restante do código-fonte para o container
COPY . ./

# Construir a aplicação React
# RUN yarn build

# Etapa 2: Configurar o Nginx para servir os arquivos
FROM nginx:stable-alpine AS production

# Remover configurações padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar o build do React gerado na etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Configurar o Nginx para lidar com React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Iniciar o Nginx em modo foreground
CMD ["nginx", "-g", "daemon off;"]

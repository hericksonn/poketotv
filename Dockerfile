# Etapa de compilação
FROM node:16 AS build
WORKDIR /

# Copia os arquivos de configuração e instala as dependências
COPY package*.json ./
RUN npm install

# Copia os arquivos do projeto e constrói a aplicação
COPY . .
RUN npm run build --prod

# Etapa de produção
FROM nginx:alpine

# Copia os arquivos compilados do estágio de construção para o servidor nginx
COPY --from=build /dist/poketotv /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Inicializa o nginx
CMD ["nginx", "-g", "daemon off;"]

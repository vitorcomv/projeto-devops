# Usa a imagem base oficial do Node.js
FROM node:14

# Cria e define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código da aplicação para o diretório de trabalho
COPY . .

# Define a variável de ambiente para o modo produção
ENV NODE_ENV=production

# Expõe a porta que a aplicação irá rodar
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["node", "index.js"]

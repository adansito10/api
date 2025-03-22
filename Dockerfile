# Usa una imagen base de Node.js (versión 14 en un sistema base Alpine, que es ligero)
FROM node:14-alpine

# Añade una etiqueta de versión y descripción de la imagen
LABEL version="1.0" description="Imagen de proyecto uno"

# Define un argumento para la versión de la aplicación (puedes pasar una variable en tiempo de construcción)
ARG APP_VERSION=1.0

# Establece una variable de entorno para la aplicación
ENV NODE_ENV=production
ENV APP_VERSION=$APP_VERSION

# Crea el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json) para instalarlas
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --only=production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 3005

# Establece un punto de entrada para que el contenedor ejecute siempre Node.js
ENTRYPOINT ["node"]

# Define el comando por defecto para iniciar la aplicación
CMD ["Index.js"]

# Opcionalmente, agrega una verificación de salud para revisar si la aplicación está funcionando
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
CMD curl -f http://localhost:3004 || exit 1

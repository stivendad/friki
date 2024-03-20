# Descripción
Este proyecto consiste en el desarrollo de una aplicación web de e-commerce desarrollada por el grupo de trabajo "Friki" de Adso. La iniciativa tiene como objetivo mejorar las ventas del compañero Andrés Arias, ofreciendo una plataforma en línea donde los miembros del grupo y otros clientes interesados puedan adquirir ropa relacionada con sus intereses y aficiones frikis.

## Correr en dev (Modo de desarrollo)

1. Clonar el repositorio.
2. Crear una copia del archivo ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Iniciar docker desktop o tener el demonio de docker corriendo
5. Levantar la base de datos ```docker compose up -d```
6. Correr las migraciones de Prisma ```npx prisma migrate dev```
7. Ejecutar seed ```npm run seed```
8. Correr el proyecto ```npm run dev```




## Correr en produccion
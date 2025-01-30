# Acceso a datos relacionales y no relacionales con ORM y ODM en Node y Express

## Setting up

1. Instalar Node

Para poder correr el projecto es necesario tener nodeJS [v20.18.0](https://nodejs.org/en) o superior instalado.

2. Instalar Docker

Este proyecto esta hecho para funcionar con [docker](https://www.docker.com/). Si no desea utilizar esta herramienta debe configurar el package.json para no usarlo asi tambien todo el proceso manual que conlleva crear la base de datos.

## Usage

1. Luego de descargar el proyecto, ejecutamos el siguiente comando para descargar las dependencias

```javascript
npm install
```

2. Una vez tenemos las dependecias descargas podemos iniciar el proyecto. IMPORTANTE, antes de executar el siguiente comando no olvidar abrir docker.

```javascript
npm run dev
```

Este comando creara una instancia de docker con postgresql@latest, luego rellenara la base de datos con informacion dummy y por ultimo, iniciara la API REST.

Si lo que deseas es iniciar el proyecto sin nada de informacion, puedes ejecutar el siguiente comando

```javascript
npm start
```
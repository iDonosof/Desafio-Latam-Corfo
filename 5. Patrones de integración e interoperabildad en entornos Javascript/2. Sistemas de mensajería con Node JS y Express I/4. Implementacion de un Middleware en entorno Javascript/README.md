# Desafío - Implementación de un Middleware en entorno Javascript

## Setting up
1. Para poder correr el projecto es necesario tener nodeJS [v20.18.0](https://nodejs.org/en) o superior instalado.


## Usage

1. Luego de descargar el proyecto, ejecutamos el siguiente comando para descargar las dependencias

```javascript
npm install
```

2. Una vez tenemos las dependecias descargas podemos iniciar el proyecto.

```javascript
npm run dev
```

3. Para probar los endpoint abrimos el navegador con cualquier topic que queramos. Puedes usar [este ejemplo](http://localhost:3000/desafio-latam)

4. Una vez tengamos abierto el navegador y este cargando la pagina realizamos una solicitud post al mismo endpoint

```shell
 curl -X POST http://localhost:3000/desafio-latam -H "Content-Type: application/json" -d "{\"username\": \"User Test\", \"message\": \"test\"}"
```
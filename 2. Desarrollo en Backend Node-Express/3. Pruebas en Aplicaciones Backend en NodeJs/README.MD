
# Desarrollo Backend Unidad 3 Hito 1, 2 y 3

## Setting up

### 1. Instalar version de node
Para poder correr el projecto es necesario tener nodeJS [v20.18.0](https://nodejs.org/en) o superior instalado. Una vez clonado el proyecto se debe instalar las dependencias utilizando el siguiente comando:

```javascript
npm install
```

### 2. Instalar motor de base de datos
Tambien debemos tener instalado docker con una instancia de PostgreSql corriendo o en su defecto, tener corriendo el motor en local. Luego de esto debemos setear las variablas de entorno, para esto debemos modificar el archivo `.local.env` y agregar los siguientes campos con la informacion de conexion de base de datos

```
DEFAULT_DB_HOST=[Nuestro host]
DEFAULT_DB_NAME=[Nombre de nuestra base de datos por defecto]
DEFAULT_DB_USER=[Nombre de usuario]
DEFAULT_DB_PASSWORD=[Contraseña del usuario]
```

### 3. Crear Base de datos e ingresar data

Para poder utilizar nuestra base de datos debemos crearla y rellenarla con valores por defecto. Para lograr esto ejecutamos los siguientes comandos

```
npm run create-database
npm run seed
```

## Usage

Finalmente para levantar nuestro API Rest debemos ejecutar el siguiente comando

```
npm start
```

Y veremos el siguiente comando por consola 

```
Server running
```

## Testing

To run the test execute the following command

```
npm run test
```
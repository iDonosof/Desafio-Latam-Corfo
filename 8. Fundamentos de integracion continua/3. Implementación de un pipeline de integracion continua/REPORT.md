## Pasos de configuracion y despliegue

1. Este proyecto es una sub carpeta de un repositorio mas grande con todas las carpetas, asi que no se ejecuto ningun comando de git local

2. Creamos el proyecto con `npm init` e instalamos las dependencias con `npm install`

![image](images/Project%20Files.png)

Terminamos el desarrollo y lo levantamos localmente usando `npm start`

![image](images/Server%20working.png)


3. Jenkins fue instalado usando docker con el comando 
`docker run -p 8080:8080 -p 50000:50000 --restart=on-failure -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk17`. Tambien instalamos node y npm en la consola directo del contenedor con `apt-get update`, `apt-get install nodejs`, `apt-get install npm`

![image](images/Docker%20Dashboard.png)

Luego configuramos Jenkins

![image](images/Jenkins%20Settings.png)

4. Para correr las pruebas corremos el pipeline creado en jenkins y este es el output obtenido

![image](images/Jenkins%20console.png)
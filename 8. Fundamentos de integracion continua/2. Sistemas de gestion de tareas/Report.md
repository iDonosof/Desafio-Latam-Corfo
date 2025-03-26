# Pasos realizados

1. Seteamos node con ```npm init -y```
2. Creamos el archivo app.js
3. Instalamos bibliotecas requeridas
4. Desarrollamos la aplicacion
5. Creamos archivos ```Dockerfile``` y ```Jenkinsfile```
6. Iniciamos repositorio git con ```git init```
7. Creamos repositorio en Github y subimos los cambios al repositorio
8. Creamos docker container de jenkins con ```docker run -p 8080:8080 -p 50000:50000 --restart=on-failure jenkins/jenkins:lts-jdk17```
9. Configuramos Jenkins en ```http://localhost:8080/```
10. Acceder a la consola de jenkins con usuario root: ```docker exec -u root -it jenkins bash```
11. Instalamos node con ```apt-get -y install curl``` y luego ```curl -fsSL https://deb.nodesource.com/setup_18.x | bash -```
12. Instalamos docker dentro de jenkins con ```apt-get install -y docker-ce-cli``` y le damos permisos para utilizarlo ```usermod -aG docker jenkins``` ```chmod 666 /var/run/docker.sock```
13. Runeamos el pipeline desde la interface grafica de jenkins
14. Descargamos el log del pipeline generado

## Problemas encontrados

1. Utilizar jenkins con docker, configuracion, etc...
2. El contenedor de docker donde se aloja jenkins, no reconocia los comandos de node ya que este no viene con node instalado.
3. Nos encontramos con la disyuntiva de que no conociamos como instalar node dentro de jenkins
4. Como crear el contenedor de docker de la aplicacion, usando el contenedor de jenkins

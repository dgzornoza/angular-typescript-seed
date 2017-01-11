# angular-typescript-seed
Seed project for angular 1 apps with typescript.  http://angularjs.org/ 


#requisitos desarrollo

[Nodejs version 4 o superior](https://nodejs.org/en/)

NOTA: Antes de la instalacion debe verificarse que se tiene una version de node 4 o superior,
ademas, el gestor de paquetes 'npm' debe ser superior a la version 3.
Para ello se puede verificar mediante el comando 'npm version'
(Es posible que VS haya instalado una version inferior, de modo que debera desinstalarse manualmente antes de instalar node)


Cualquier IDE en prinicipio es valido, se recomienda Webstorm o VsCode por ser los mas ligeros.

#instalacion

- Actualizar npm
npm install -g npm@latest 

- abrir una consola en el directorio del proyecto y ejecutar el comando para la instalacion de los paquetes node del proyecto:<br /><br />
 npm install
 

#Generacion

Para la generacion debera ejecutarse algunos de los siguientes comandos configurados en node<br /> 
NOTA: tambien se pueden ejecutar desde el IDE en la ventana npm.



 - Generar proyecto:<br /><br />
  npm run build-debug
  
 - Regenerar proyecto (limpia directorio de salida y lo genera):<br /><br />
  npm run rebuild-debug
   
 - activar watch del codigo fuente (esto realizara la generacion correspondiente para el archivo fuente modificado, 
 de modo que la salida siempre este actualizada)<br /><br />
 npm run watch
 
 
NOTA: los comandos de node para la generacion hacen uso de tareas 'gulp' que pueden ser ejecutadas mediante gulp de forma individual.



#Depuracion

Para depurar se puede ejecutar el navegador deseado, los siguientes comandos npm abren los diferentes navegadores:

npm run chrome<br />
npm run edge<br />
npm run iexplore<br />






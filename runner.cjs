// Importamos el módulo 'child_process' que permite ejecutar comandos de sistema.
const { execSync } = require('child_process');

// Obtenemos los argumentos pasados por consola (excluyendo los dos primeros que son node y la ruta del archivo)
const args = process.argv.slice(2);

// Desestructuramos los tres parámetros esperados: versión del entorno, nombre del feature, y el tag a ejecutar
const [version, feature, tag] = args;

// Validamos si algún argumento falta. Si no se pasaron correctamente los 3, mostramos error y cortamos ejecución
if (!version || !feature || !tag) {
  console.error('❌ Missing arguments. Usage: node runner.cjs <version> <feature> <tag>');
  process.exit(1); // Salida con código 1 = error
}

/*
 Construimos el comando a ejecutar:
 - npx cypress run: ejecuta Cypress usando npx (usando la instalación local del proyecto)
 - --headed: abre el navegador en modo visual (no headless)
 - --spec: se especifica el archivo .feature a ejecutar. Usa "**" por si está en subcarpetas dentro de /features
 - --env: pasamos variables de entorno que Cypress usará:
     - allure=true -> habilita reportes Allure
     - version -> se usa para cargar datos del entorno (QA, STG, etc.)
     - amb=LOCAL -> ejemplo de entorno de ejecución
     - tags=@tag -> filtra los escenarios que contengan ese tag en el archivo .feature
*/
const command = `npx cypress run --headed --spec cypress/e2e/features/**/${feature}.feature --env allure=true,version=${version},amb=LOCAL,tags=@${tag}`;

// Mostramos en consola el comando completo que se va a ejecutar, para tener trazabilidad
console.log(`▶ Running: ${command}`);

// Ejecutamos el comando. Usamos stdio: 'inherit' para que se vean en consola en tiempo real los logs de Cypress
execSync(command, { stdio: 'inherit' });

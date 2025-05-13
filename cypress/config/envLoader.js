/**
 * Este módulo permite cargar variables de entorno dinámicamente
 * según el ambiente especificado (`QA`, `DEV`, `STAGE`, etc.),
 * así como los datos de prueba asociados al entorno seleccionado.
 *
 * ✔ Carga el archivo .env correspondiente según la variable `version`.
 * ✔ Expone las variables de entorno a `config.env`.
 * ✔ Carga datos del archivo JSON ubicado en /fixtures/{version}/test-data.json.
 *
 * Se utiliza durante la inicialización de Cypress para configurar
 * el entorno de ejecución según las necesidades del proyecto.
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * Carga las variables de entorno y los datos de prueba para el ambiente actual.
 * 
 * @param {Object} config - Objeto de configuración de Cypress.
 * @returns {Object} - Objeto `config` actualizado con variables y test data.
 */
function loadEnvVariables(config) {
  // Se determina el entorno a usar. Por defecto, se usa "QA".
  const version = (config.env.version || "QA").toUpperCase();

  // Se construyen las rutas al archivo de entorno y al test-data.json del entorno.
  const envFilePath = path.resolve('./cypress/config', `${version}.env`);
  const testDataPath = path.resolve('./cypress/fixtures', `${version}/test-data.json`);

  // Si existe el archivo .env, se cargan sus variables en process.env.
  if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
  } else {
    console.warn(`⚠️ Archivo de entorno no encontrado: ${envFilePath}`);
  }

  // Se agregan todas las variables del process.env al objeto config.env.
  Object.keys(process.env).forEach(key => {
    config.env[key] = process.env[key];
  });

  // Se sobreescriben o agregan configuraciones clave al objeto config.env.
  config.env = {
    ...config.env,
    allure: process.env.ALLURE === "true",          // Habilita o no los reportes de Allure
    video: process.env.VIDEO === "true",            // Habilita o no la grabación de video
    amb: process.env.AMB || "LOCAL",                // Define el ambiente actual (QA, DEV, LOCAL, etc.)
    baseUrl: process.env.BASE_URL,                  // URL base para las pruebas
    username: process.env.USERNAME_WEB,             // Usuario para login (desde .env)
    password: process.env.PASSWORD_WEB              // Contraseña para login (desde .env)
  };

  // Se carga el archivo de test data (datos de prueba) y se inyecta en config.env.
  if (fs.existsSync(testDataPath)) {
    config.env.testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
  } else {
    throw new Error(`❌ No se encontró test-data.json en: ${testDataPath}`);
  }

  // Se retorna el objeto config actualizado.
  return config;
}

export { loadEnvVariables };

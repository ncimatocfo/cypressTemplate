/**
 * Archivo de soporte principal que se ejecuta automáticamente
 * antes de cada archivo de prueba (`.cy.js`, `.feature`, etc.).
 *
 * ✔ Ideal para configurar plugins y registrar comandos globales.
 * ✔ Importa todas las definiciones de comandos customizados.
 * ✔ Habilita extensiones útiles como XPath, WaitUntil, Allure, etc.
 *
 * 🔧 Este archivo se referencia desde `cypress.config.js`
 * mediante la propiedad `supportFile`.
 */

// 📦 Importación de comandos personalizados divididos por dominio
import './commands/apiCommands';
import './commands/dbCommands';
import './commands/utilsCommands';

// (Opcional) Referencia a páginas, en caso de registrar instancias globales
import './pages/demoPage';

// 🔌 Plugins y extensiones de utilidad
import 'cypress-wait-until';                  // Esperas personalizadas (hasta que se cumpla una condición)
import 'cypress-xpath';                       // Soporte para selectores XPath
import '@shelex/cypress-allure-plugin';       // Integración con Allure Report
import '@bahmutov/cy-api';                    // Comando `cy.api` para pruebas RESTful
/**
 * Este archivo define los pasos Gherkin para la interacción con
 * la página de inicio de sesión y la validación de ingreso exitoso
 * al sistema. Utiliza la clase DemoPage (Page Object Model).
 *
 * ✔ Navega al sistema y realiza login con credenciales desde .env.
 * ✔ Verifica que se haya accedido correctamente a la pantalla de productos.
 */

import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { DemoPage } from '../../support/pages/demoPage';

// Instancia de la clase que encapsula acciones de la página
const demoPage = new DemoPage();

/**
 * Paso When:
 * Navega a la URL base e inicia sesión utilizando las credenciales
 * definidas en el archivo de entorno (username y password).
 */
When('inicio sesión con usuario válido', () => {
  demoPage.navegarBaseURL();
  demoPage.iniciarSesionConCredenciales();
});

/**
 * Paso Then:
 * Valida que se haya llegado correctamente a la página de productos,
 * comparando contra el título esperado definido en test-data.json.
 */
Then('debería ver la página de productos', () => {
  demoPage.validarPaginaProductos();
});

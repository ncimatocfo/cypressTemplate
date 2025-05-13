/**
 * Este archivo define los pasos Gherkin (Given/When/Then) que se
 * vinculan a pruebas relacionadas con la autenticación por API.
 *
 * ✔ Utiliza comandos custom definidos en apiCommands.js.
 * ✔ Usa alias para acceder a la respuesta y validarla.
 * ✔ Integra con el preprocesador Cucumber de Cypress.
 */

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Paso Given:
 * Ejecuta una autenticación vía API y almacena el token recibido
 * en las variables de entorno para su posterior reutilización.
 */
Given('que el usuario se loguea correctamente vía API', () => {
  cy.loginAPI();
});

/**
 * Paso When:
 * Consulta el perfil autenticado utilizando el token JWT previamente guardado
 * y lo guarda como alias "@userProfile" para futuras validaciones.
 */
When('obtiene su perfil autenticado', () => {
  cy.getUserProfile();
});

/**
 * Paso Then:
 * Valida que el nombre del usuario retornado por la API coincida
 * con el valor esperado recibido como parámetro en el escenario.
 *
 * @param {string} nombreEsperado - Nombre que debería tener el perfil autenticado.
 */
Then('debería ver su nombre como {string}', (nombreEsperado) => {
  cy.get('@userProfile').then((profile) => {
    expect(profile.firstName).to.eq(nombreEsperado);
  });
});

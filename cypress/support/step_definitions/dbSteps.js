/**
 * Este archivo define los pasos Gherkin para manipulación de datos
 * en bases de datos dentro de pruebas automatizadas.
 *
 * ✔ Soporte para: MySQL, PostgreSQL y MongoDB.
 * ✔ Permite insertar, buscar y eliminar usuarios en las BDs.
 * ✔ Utiliza comandos customizados definidos en dbCommands.js.
 */

import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

//
// 🔹 MySQL Steps
//

/**
 * Inserta un usuario con nombre y email en la tabla `users` de MySQL.
 */
Given('inserto en MySQL el usuario {string} con el email {string}', (nombre, email) => {
  cy.insertMySQLUser(nombre, email);
});

/**
 * Valida que el usuario con el nombre dado exista en la base de datos MySQL.
 */
Then('debería existir en MySQL el usuario {string}', (nombre) => {
  cy.findMySQLUser(nombre).then(res => {
    expect(res.length).to.be.greaterThan(0);
  });
});

/**
 * Elimina al usuario con el nombre dado en la base de datos MySQL.
 */
Then('elimino en MySQL el usuario {string}', (nombre) => {
  cy.deleteMySQLUser(nombre);
});

/**
 * Verifica que el usuario haya sido eliminado correctamente de MySQL.
 */
Then('se valida en MySQL que el usuario {string} se haya eliminado', (nombre) => {
  cy.findMySQLUser(nombre).then(res => {
    expect(res.length).to.eq(0);
  });
});

//
// 🐘 PostgreSQL Steps
//

/**
 * Inserta un usuario con nombre y email en la tabla `users` de PostgreSQL.
 */
Given('inserto en PostgreSQL el usuario {string} con el email {string}', (nombre, email) => {
  cy.insertPostgresUser(nombre, email);
});

/**
 * Valida que el usuario con el nombre dado exista en la base de datos PostgreSQL.
 */
Then('debería existir en PostgreSQL el usuario {string}', (nombre) => {
  cy.findPostgresUser(nombre).then(res => {
    expect(res.length).to.be.greaterThan(0);
  });
});

/**
 * Elimina al usuario con el nombre dado en la base de datos PostgreSQL.
 */
Then('elimino en PostgreSQL el usuario {string}', (nombre) => {
  cy.deletePostgresUser(nombre);
});

/**
 * Verifica que el usuario haya sido eliminado correctamente de PostgreSQL.
 */
Then('se valida en PostgreSQL que el usuario {string} se haya eliminado', (nombre) => {
  cy.findPostgresUser(nombre).then(res => {
    expect(res.length).to.eq(0);
  });
});

//
// 🍃 MongoDB Steps
//

/**
 * Inserta un documento de usuario con nombre y email en la colección `users` de MongoDB.
 */
Given('inserto en MongoDB el usuario {string} con el email {string}', (nombre, email) => {
  cy.insertMongoUser(nombre, email);
});

/**
 * Valida que el documento del usuario exista en MongoDB.
 */
Then('debería existir en MongoDB el usuario {string}', (nombre) => {
  cy.findMongoUser(nombre).then(res => {
    expect(res.length).to.be.greaterThan(0);
  });
});

/**
 * Elimina el documento del usuario con el nombre especificado en MongoDB.
 */
Then('elimino en MongoDB el usuario {string}', (nombre) => {
  cy.deleteMongoUser(nombre);
});

/**
 * Verifica que el documento del usuario haya sido eliminado de MongoDB.
 */
Then('se valida en MongoDB que el usuario {string} se haya eliminado', (nombre) => {
  cy.findMongoUser(nombre).then(res => {
    expect(res.length).to.eq(0);
  });
});

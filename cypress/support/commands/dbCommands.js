/**
 * Este archivo define comandos personalizados de Cypress para
 * interactuar directamente con bases de datos durante la ejecución
 * de pruebas automatizadas. Está organizado por motor:
 *
 * 🔹 MySQL
 * 🐘 PostgreSQL
 * 🍃 MongoDB
 *
 * Cada motor ofrece comandos para insertar, buscar y eliminar
 * registros de usuario en una colección o tabla `users`.
 * Los comandos utilizan `cy.task()` para delegar la ejecución al backend.
 */

// 🔹 Comandos para MySQL
Cypress.Commands.add('insertMySQLUser', (name, email) => {
  // Inserta un nuevo usuario en la tabla `users`.
  const query = `INSERT INTO users (NAME, EMAIL) VALUES ('${name}', '${email}');`;
  return cy.task('queryMySQL', query);
});

Cypress.Commands.add('findMySQLUser', (name) => {
  // Busca un usuario por nombre en la tabla `users`.
  const query = `SELECT * FROM users WHERE NAME = '${name}';`;
  return cy.task('queryMySQL', query);
});

Cypress.Commands.add('deleteMySQLUser', (name) => {
  // Elimina un usuario por nombre en la tabla `users`.
  const query = `DELETE FROM users WHERE NAME = '${name}';`;
  return cy.task('queryMySQL', query);
});

// 🐘 Comandos para PostgreSQL
Cypress.Commands.add('insertPostgresUser', (name, email) => {
  // Inserta un nuevo usuario en la tabla `users` de PostgreSQL.
  const query = `INSERT INTO users (name, email) VALUES ('${name}', '${email}');`;
  return cy.task('queryPostgres', query);
});

Cypress.Commands.add('findPostgresUser', (name) => {
  // Busca un usuario por nombre en la tabla `users`.
  const query = `SELECT * FROM users WHERE name = '${name}';`;
  return cy.task('queryPostgres', query);
});

Cypress.Commands.add('deletePostgresUser', (name) => {
  // Elimina un usuario por nombre en la tabla `users`.
  const query = `DELETE FROM users WHERE name = '${name}';`;
  return cy.task('queryPostgres', query);
});

// 🍃 Comandos para MongoDB
Cypress.Commands.add('insertMongoUser', (name, email) => {
  // Inserta un nuevo documento en la colección `users`.
  return cy.task('queryMongo', {
    collection: 'users',
    operation: 'insertOne',
    query: { name, email }
  });
});

Cypress.Commands.add('findMongoUser', (name) => {
  // Busca documentos en la colección `users` por nombre.
  return cy.task('queryMongo', {
    collection: 'users',
    operation: 'find',
    query: { name }
  });
});

Cypress.Commands.add('deleteMongoUser', (name) => {
  // Elimina un documento en la colección `users` por nombre.
  return cy.task('queryMongo', {
    collection: 'users',
    operation: 'deleteOne',
    query: { name }
  });
});

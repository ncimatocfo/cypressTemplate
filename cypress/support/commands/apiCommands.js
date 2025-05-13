/**
 * Este archivo define comandos personalizados de Cypress
 * relacionados con la autenticación y obtención de perfil de usuario
 * mediante peticiones API, reutilizables en múltiples tests.
 *
 * ✔ loginAPI: realiza autenticación vía API y guarda el token JWT.
 * ✔ getUserProfile: consulta el perfil del usuario autenticado
 *   utilizando el token previamente almacenado.
 */

Cypress.Commands.add('loginAPI', () => {
  // Ejecuta una petición POST para autenticación con credenciales dummy.
  cy.api({
    method: 'POST',
    url: 'https://dummyjson.com/auth/login',
    body: {
      username: 'emilys',
      password: 'emilyspass'
    }
  }).then((response) => {
    // Verifica que la respuesta sea exitosa (HTTP 200).
    expect(response.status).to.eq(200);

    // Guarda el token recibido en variables de entorno para uso posterior.
    Cypress.env('authToken', response.body.accessToken);
  });
});

Cypress.Commands.add('getUserProfile', () => {
  // Obtiene el token previamente guardado durante loginAPI.
  const token = Cypress.env('authToken');

  // Ejecuta una petición GET autenticada para obtener el perfil del usuario.
  cy.api({
    method: 'GET',
    url: 'https://dummyjson.com/auth/me',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    // Verifica que la respuesta sea exitosa (HTTP 200).
    expect(response.status).to.eq(200);

    // Almacena el cuerpo de la respuesta bajo el alias "userProfile" para su uso en el test.
    cy.wrap(response.body).as('userProfile');
  });
});
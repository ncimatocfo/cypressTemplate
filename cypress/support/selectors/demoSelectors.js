/**
 * Este archivo contiene los selectores utilizados en la página
 * de inicio de sesión y productos del sistema bajo prueba.
 *
 * ✔ Se definen como propiedades del objeto `demo` para facilitar
 *   su mantenimiento y reutilización desde clases Page Object.
 * ✔ Todos los selectores están escritos en formato XPath.
 */

export const demo = {
  // Campo de input para el nombre de usuario
  inputUsuario: '//input[@id="user-name"]',

  // Campo de input para la contraseña
  inputPassword: '//input[@id="password"]',

  // Botón de ingreso (login)
  btnIngresar: '//input[@id="login-button"]',

  /**
   * Selector dinámico para validar el título de la página de productos.
   * Recibe el texto esperado como argumento.
   *
   * @param {string} titulo - Texto visible del título esperado.
   * @returns {string} XPath construido dinámicamente.
   */
  tituloPaginaProductos: (titulo) => `//span[text()='${titulo}']`,
};
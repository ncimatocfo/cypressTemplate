/**
 * Esta clase representa una página del sistema bajo prueba (login + productos),
 * y aplica el patrón Page Object Model (POM) para encapsular las acciones
 * y selectores que se ejecutan sobre dicha interfaz.
 *
 * ✔ Utiliza comandos custom reutilizables (clickElementByXpath, typeClearFieldByXpath).
 * ✔ Accede a datos de prueba mediante Cypress.env('testData').
 * ✔ Utiliza selectores definidos en demoSelectors.js.
 */

import { demo } from '../selectors/demoSelectors';

// Accede a los datos de prueba cargados desde test-data.json
const data = Cypress.env('testData');

export class DemoPage {

    /**
     * Navega a la URL base del proyecto (definida en el archivo de entorno).
     */
    navegarBaseURL() {
        cy.visit("/");
    }

    /**
     * Ingresa un nombre de usuario en el input correspondiente.
     * @param {string} user - Nombre de usuario.
     */
    ingresarUsuario(user) {
        cy.typeClearFieldByXpath(demo.inputUsuario, user);
    }

    /**
     * Ingresa la contraseña en el input correspondiente.
     * @param {string} pass - Contraseña.
     */
    ingresarPassword(pass) {
        cy.typeClearFieldByXpath(demo.inputPassword, pass);
    }

    /**
     * Hace clic en el botón para confirmar inicio de sesión.
     */
    confirmarLogin() {
        cy.clickElementByXpath(demo.btnIngresar);
    }

    /**
     * Ejecuta el flujo completo de login utilizando credenciales
     * definidas en el archivo .env (username y password).
     */
    iniciarSesionConCredenciales() {
        const user = Cypress.env('username');
        const pass = Cypress.env('password');
        this.ingresarUsuario(user);
        this.ingresarPassword(pass);
        this.confirmarLogin();
    }

    /**
     * Valida que se haya llegado a la página de productos
     * verificando el título esperado definido en test-data.json.
     */
    validarPaginaProductos() {
        cy.waitForElementVisible(demo.tituloPaginaProductos(data.pagina.tituloEsperado));
    }
}

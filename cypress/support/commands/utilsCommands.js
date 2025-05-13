/**
 * Este archivo define una serie de comandos personalizados de utilidad
 * para interactuar con elementos web utilizando selectores XPath.
 *
 * ✔ Permite escribir, limpiar, hacer clic, validar texto o valores.
 * ✔ Incluye comandos para seleccionar opciones en <select>, verificar
 *   visibilidad, obtener texto y resaltar elementos visualmente.
 * ✔ Mejora la legibilidad y mantenimiento de los tests automatizados.
 */

// Escribe texto en un campo localizado por XPath
Cypress.Commands.add('typeFieldByXpath', (locator, text) => {
  cy.xpath(locator).should('be.visible').then($el => {
    cy.highlightBorderElement($el, 'magenta');
    cy.wrap($el).type(text);
    cy.highlightBorderElement($el, 'transparent');
  });
});

// Limpia y escribe texto en un campo localizado por XPath
Cypress.Commands.add('typeClearFieldByXpath', (locator, text) => {
  cy.xpath(locator).should('be.visible').then($el => {
    cy.highlightBorderElement($el, 'magenta');
    cy.wrap($el).clear().type(text);
    cy.highlightBorderElement($el, 'transparent');
  });
});

// Hace clic sobre un elemento ubicado por XPath
Cypress.Commands.add('clickElementByXpath', (locator) => {
  cy.xpath(locator).should('be.visible').then($el => {
    cy.highlightBorderElement($el, 'magenta');
    cy.wrap($el).click();
    cy.highlightBorderElement($el, 'transparent');
  });
});

// Elimina un atributo específico de un elemento localizado por XPath
Cypress.Commands.add("removeAttributeByXpath", (locator, attribute) => {
  cy.xpath(locator).should('exist').invoke('removeAttr', attribute);
});

// Valida que un elemento exista en el DOM
Cypress.Commands.add('validateElementExists', (locator) => {
  cy.xpath(locator).should('exist');
});

/**
 * Valida que el texto de un elemento coincida total o parcialmente
 * con uno o varios textos esperados.
 *
 * @param {string} locator - XPath del elemento.
 * @param {string|string[]} expectedTexts - Texto(s) esperado(s).
 * @param {Object} options - Configuración adicional.
 *        matchCase: sensibilidad a mayúsculas/minúsculas.
 *        contains: si se debe hacer coincidencia parcial o total.
 *        timeout: tiempo de espera en ms.
 */
Cypress.Commands.add("assertTextInElementByXpath", (locator, expectedTexts, options = {}) => {
  const { matchCase = false, contains = true, timeout = 15000 } = options;
  const textsArray = Array.isArray(expectedTexts) ? expectedTexts : [expectedTexts];

  cy.xpath(locator, { timeout })
    .should('be.visible')
    .invoke('text')
    .then(actualText => {
      const text = matchCase ? actualText.trim() : actualText.trim().toLowerCase();

      const matched = textsArray.some(expected => {
        const expectedText = matchCase ? expected.trim() : expected.trim().toLowerCase();
        return contains ? text.includes(expectedText) : text === expectedText;
      });

      expect(matched, `Ningún texto esperado [${textsArray.join(", ")}] encontrado`).to.be.true;
    });
});

/**
 * Valida el valor de un campo de texto o contenido textual del elemento.
 *
 * @param {string} locator - XPath del elemento.
 * @param {string} expectedValue - Valor esperado.
 */
Cypress.Commands.add('validateElementValueByXpath', (locator, expectedValue, timeout = 15000) => {
  cy.xpath(locator, { timeout }).should('be.visible').then($el => {
    cy.highlightBorderElement($el, 'cyan');
    const actualValue = $el.val()?.trim() || $el.text().trim();
    expect(actualValue).to.equal(expectedValue);
    cy.highlightBorderElement($el, 'transparent');
  });
});

// Valida el texto seleccionado actualmente en un <select>
Cypress.Commands.add('validateSelectTextByXpath', (locator, expectedText, timeout = 15000) => {
  cy.xpath(locator, { timeout })
    .should('exist')
    .find('option:selected')
    .should('have.text', expectedText);
});

// Valida que múltiples elementos contengan textos esperados (uno por uno)
Cypress.Commands.add('validateElementsContainsByXpath', (locator, expectedTexts = [], timeout = 10000) => {
  expectedTexts.forEach(text => {
    cy.xpath(locator, { timeout }).should('contain.text', text);
  });
});

// Obtiene el texto o valor de un elemento localizado por XPath
Cypress.Commands.add('getElementTextByXpath', (locator, timeout = 15000) => {
  return cy.xpath(locator, { timeout })
    .should('be.visible')
    .then($el => $el.val()?.trim() || $el.text().trim());
});

/**
 * Selecciona una opción dentro de un <select> por texto visible o por índice.
 *
 * @param {string} locator - XPath del <select>.
 * @param {Object} opciones - { text, index }
 */
Cypress.Commands.add('selectByXpath', (locator, { text = null, index = null }, timeout = 15000) => {
  cy.xpath(locator, { timeout }).should('be.visible').then($el => {
    cy.highlightBorderElement($el, 'magenta');
    if (text !== null) {
      cy.wrap($el).select(text);
    } else if (index !== null) {
      cy.wrap($el).find('option').eq(index).then($opt => cy.wrap($el).select($opt.val()));
    } else {
      throw new Error('Se debe proporcionar texto o índice para seleccionar opción');
    }
    cy.highlightBorderElement($el, 'transparent');
  });
});

// Espera hasta que un elemento sea visible (en segundos)
Cypress.Commands.add('waitForElementVisible', (locator, timeoutSeconds = 15) => {
  cy.xpath(locator, { timeout: timeoutSeconds * 1000 }).should('be.visible');
});

// Resalta un elemento visualmente en la interfaz (útil para debugging)
Cypress.Commands.add('highlightBorderElement', (element, color = 'red') => {
  element.css('box-shadow', `0 0 0 2px ${color}`);
});
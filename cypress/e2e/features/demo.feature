Feature: Login SauceDemo

  @Demo
  Scenario: Iniciar sesión con credenciales válidas
    When inicio sesión con usuario válido
    Then debería ver la página de productos
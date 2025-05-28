Feature: Login y autenticación con DummyJSON API

  @API
  Scenario: El usuario se loguea y accede a su perfil
    Given que el usuario se loguea correctamente vía API
    When obtiene su perfil autenticado
    Then debería ver su nombre como "Emily"
Feature: Operaciones con bases de datos (MySQL, PostgreSQL y MongoDB)

  @DB_MySQL
  Scenario: Insertar y validar un usuario en MySQL
    Given inserto en MySQL el usuario "Leandro" con el email "leandro@test.com"
    Then debería existir en MySQL el usuario "Leandro"
    Then elimino en MySQL el usuario "Leandro"
    Then se valida en MySQL que el usuario "Leandro" se haya eliminado

  @DB_PostgreSQL
  Scenario: Insertar y validar un usuario en PostgreSQL
    Given inserto en PostgreSQL el usuario "María" con el email "maria@test.com"
    Then debería existir en PostgreSQL el usuario "María"
    Then elimino en PostgreSQL el usuario "María"
    Then se valida en PostgreSQL que el usuario "María" se haya eliminado

  @DB_MongoDB
  Scenario: Insertar y validar un usuario en MongoDB
    Given inserto en MongoDB el usuario "Carlos" con el email "carlos@test.com"
    Then debería existir en MongoDB el usuario "Carlos"
    Then elimino en MongoDB el usuario "Carlos"
    Then se valida en MongoDB que el usuario "Carlos" se haya eliminado
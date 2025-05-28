# 📌 Cypress Automation Framework

Este es un framework profesional y modular para pruebas automatizadas usando **Cypress** y **TypeScript**. Diseñado para cubrir pruebas de extremo a extremo (E2E), validaciones por API y pruebas contra bases de datos, este proyecto soporta integraciones con MySQL, PostgreSQL y MongoDB, incluyendo una arquitectura limpia y mantenible con Page Object Model, comandos personalizados y soporte para Cucumber.

---

## 🚀 Características principales

* ✅ Automatización de pruebas UI con Cypress (modo headed o headless)
* ⚖ Soporte para pruebas con sintaxis Gherkin (Cucumber)
* ⚡ Integración con bases de datos: **MongoDB**, **MySQL**, **PostgreSQL**
* 📊 Reportes visuales con **Allure** (resultados por test/tag)
* 🛠️ Modularidad basada en buenas prácticas (Pages, Commands, Services)
* 🌐 Variables de entorno por ambiente mediante `.env` y loader dinámico
* ⚛️ Ejecución por tag, por feature o parametrizada por scripts personalizados

---

## 🗂️ Estructura del proyecto

```
Template-Framework-Cypress/
├── cypress/
│   ├── config/                 # Variables de entorno por ambiente y loader dinámico
│   ├── e2e/
│   │   └── features/           # Escenarios definidos en sintaxis Gherkin (.feature)
│   ├── fixtures/
│   │   ├── DEV/                # Datos de prueba para entorno DEV (JSON)
│   │   └── QA/                 # Datos de prueba para entorno QA (JSON)
│   ├── support/
│   │   ├── commands/           # Comandos personalizados Cypress (API, DB, Utils...)
│   │   ├── pages/              # Page Objects reutilizables con lógica de UI
│   │   ├── selectors/          # Mapeo de selectores desacoplados por vista o módulo
│   │   └── step_definitions/   # Implementación modular de pasos (step definitions) para Cucumber
│   └── e2e.js                  # Setup global de Cypress (hooks, configuraciones)
│
├── .gitignore                  # Exclusiones de archivos y carpetas para Git
├── cypress.config.js           # Configuración principal de Cypress
├── package.json                # Dependencias, scripts y metadatos del proyecto
├── package-lock.json           # Resolución de versiones exactas (lockfile de npm)
├── readme.md                   # Documentación general del proyecto
└── runner.cjs                  # Script CLI para ejecución por env/feature/tag
```

> 📌 Nota: La estructura está diseñada para crecer modularmente. Cada componente (comandos, páginas, selectores, datos y steps) se organiza por responsabilidad, facilitando el mantenimiento, escalabilidad y colaboración en equipo.

---

## ⚙️ Requisitos previos

* Node.js v18+ recomendado
* npm v9+ o superior

---

## 🛠️ Instalación inicial

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Template-Framework-Cypress
```

### 2. Instalar dependencias

```bash
npm install
```

> ✅ Alternativamente, para entornos CI/CD, se recomienda:

```bash
npm ci
```

Esto asegura una instalación limpia y 100% reproducible basada en `package-lock.json`.

---

## 🌍 Configuración de ambientes

El framework utiliza archivos `.env` ubicados en `cypress/config/` para definir variables por entorno:

* `DEV.env`
* `QA.env`

Ejemplo de estructura de un archivo `.env`:

```env
#############################
# 🔧 CONFIGURACIÓN GENERAL
#############################

BASE_URL=https://mi-aplicacion.com
ALLURE=true
VIDEO=false
RETRIES=1
AMB=DEV

#############################
# 🔐 CREDENCIALES DE ACCESO WEB
#############################

USERNAME_WEB=usuario_demo
PASSWORD_WEB=clave_segura

#############################
# 🔌 CONEXIÓN A BASES DE DATOS
#############################

# MySQL
MYSQL_HOST=mi-host-mysql.com
MYSQL_USER=usuario_mysql
MYSQL_PASS=contrasena_mysql
MYSQL_DB=nombre_base_datos_mysql
MYSQL_PORT=3306

# PostgreSQL
POSTGRES_HOST=mi-host-postgres.com
POSTGRES_USER=usuario_pg
POSTGRES_PASS=contrasena_pg
POSTGRES_DB=nombre_base_datos_pg
POSTGRES_PORT=5432

# MongoDB
MONGO_URI=mongodb+srv://usuario:clave@host.mongodb.net/?retryWrites=true&w=majority
MONGO_DB=nombre_base_datos_mongo
```

> ✅ Podés añadir valores por defecto para desarrollo local en `.env` genérico si lo necesitás.

---

## 🧪 Ejecución de pruebas

### 💡 Importante sobre PowerShell

Si estás en **Windows PowerShell**, la siguiente sintaxis no es válida:

```bash
ENV=QA npm run test
```

Esto genera el error:

```
ENV=QA : El término 'ENV=QA' no se reconoce como nombre de un cmdlet...
```

✅ En su lugar, usá:

```powershell
$env:ENV="QA"
npx cypress run
```

Esto establecerá la variable de entorno ENV en PowerShell para que Cypress pueda cargar correctamente la configuración correspondiente.

---

### ✅ Scripts preconfigurados (`package.json`)

Este framework incluye scripts personalizados y soporte para `runner.cjs` que permite ejecutar pruebas parametrizadas por entorno, feature y tag.

#### Ejemplos de ejecución:

```bash
# Ejecutar el feature de "demo.feature" en entorno DEV con tag @DB_MySQL
npm run TEST DEV demo Demo

# Ejecutar el feature de "db.feature" en entorno QA con tag @DB_MySQL
npm run TEST QA db DB_MySQL
```

---

### ✅ Scripts preconfigurados (`package.json`)

Este framework incluye scripts personalizados y soporte para `runner.cjs` que permite ejecutar pruebas parametrizadas por entorno, feature y tag.

#### Ejemplos de ejecución:

```bash
# Ejecutar un feature con tag @Demo en entorno QA
npm run TEST QA demo Demo

# Ejecutar el feature de base de datos en entorno QA con tag @DB_MySQL
npm run TEST QA db DB_MySQL

# Generar y abrir reporte Allure
npm run allure:report
npm run allure:open
```

#### Scripts definidos en `package.json`:

El archivo `package.json` ya incluye una amplia gama de scripts organizados por ambiente (DEV y QA) y por tipo de prueba (DEMO, API, DB, ALL). También se incluye un script genérico `TEST` que utiliza el runner dinámico `runner.cjs` para ejecutar pruebas parametrizadas.

```json
"scripts": {
  "test": "cypress run",
  "open": "cypress open",
  "DEV:DEMO": "npx cypress run --headed --spec cypress/e2e/features/demo.feature --env allure=true,version=DEV,amb=LOCAL",
  "DEV:API": "npx cypress run --headed --spec cypress/e2e/features/apiLogin.feature --env allure=true,version=DEV,amb=LOCAL",
  "DEV:DB": "npx cypress run --headed --spec cypress/e2e/features/db.feature --env allure=true,version=DEV,amb=LOCAL",
  "DEV:ALL": "npx cypress run --headed --spec cypress/e2e/features/**/*.feature --env allure=true,version=DEV,amb=LOCAL",
  "QA:DEMO": "npx cypress run --headed --spec cypress/e2e/features/demo.feature --env allure=true,version=QA,amb=LOCAL",
  "QA:API": "npx cypress run --headed --spec cypress/e2e/features/apiLogin.feature --env allure=true,version=QA,amb=LOCAL",
  "QA:DB": "npx cypress run --headed --spec cypress/e2e/features/db.feature --env allure=true,version=QA,amb=LOCAL",
  "QA:ALL": "npx cypress run --headed --spec cypress/e2e/features/**/*.feature --env allure=true,version=QA,amb=LOCAL",
  "TEST": "node runner.cjs",
  "allure:report": "allure generate allure-results --clean -o allure-report ",
  "allure:clear": "rmdir /s /q allure-results && rmdir /s /q allure-report || true",
  "allure:history": "move allure-report/history allure-results/history && rmdir /s /q allure-report || exit 0",
  "allure:open": "allure open"
}
```

> ✅ Esta estructura permite ejecutar fácilmente combinaciones comunes sin repetir comandos manuales, y también brinda flexibilidad para ejecutar cualquier escenario desde el runner personalizado.

#### 🔧 Crear tu propio script

Podés definir un nuevo script personalizado en `package.json`. Por ejemplo, para ejecutar un escenario etiquetado como `@Smoke` en entorno QA:

```json
"smoke:qa": "npx cypress run --headed --env allure=true,version=QA,amb=LOCAL,tags=@Smoke"
```

Y ejecutarlo con:

```bash
npm run smoke:qa
```

Tambien un nuevo script personalizado para una feature en concreto, sin necesidad de etiquetas:

```json
"QA:LOGIN": "npx cypress run --headed --spec cypress/e2e/features/login.feature --env allure=true,version=QA,amb=LOCAL"
```

Y ejecutarlo con:

```bash
npm run QA:LOGIN
```

---

## 📂 Testing de base de datos

El framework permite conectar y validar contra las siguientes bases de datos:

* `MongoDB`
* `MySQL`
* `PostgreSQL`

Estas integraciones están manejadas mediante comandos reutilizables ubicados en:

```
cypress/support/commands/dbCommands.js
```

Cada archivo maneja operaciones como ejecución de querys y validaciones específicas para su tecnología.

---

## 🌐 Testing de APIs

Los tests de API están organizados a través de comandos personalizados reutilizables en:

```
cypress/support/commands/apiCommands.js
```

También se pueden extender con servicios en `services/` si la lógica de negocio lo requiere.

Para validar flujos completos, los escenarios Cucumber usan estos comandos para realizar requests, validar status codes, headers, body, y tokens.

---

## 📊 Reportes disponibles

### Allure Report

1. Generar el reporte:

```bash
npm run allure:report
```

2. Abrir el reporte en el navegador:

```bash
npm run allure:open
```

3. Limpiar historial y resultados:

```bash
npm run allure:clear
```

> 📝 El reporte Allure proporciona estadísticas detalladas por tag, feature y escenarios individuales, así como históricos si se activa `allure:history`.

---

## 💡 Buenas prácticas

* Centralizar selectores en `selectors/` para facilitar el mantenimiento.
* Organizar los Page Objects por módulo funcional en `pages/`.
* Usar `fixtures/` para mantener datos externos separados del código.
* Usar `config/.env` para mantener datos sensibles separados de la cloud. (Pasar encriptados por CI/CD)
* Delegar operaciones complejas o lógicas de negocio a `commands/` o `services/`.
* Evitar hardcodear datos: usar variables, funciones utilitarias o datos parametrizados.

---

### 1️⃣ Crear archivo `.feature`

Ubicá el archivo dentro de `cypress/e2e/features/`. Cada escenario debe tener un tag (`@Demo`, `@Login`, etc.) que luego puede ser filtrado en la ejecución:

```gherkin
Feature: Login SauceDemo

  @Demo
  Scenario: Iniciar sesión con credenciales válidas
    When inicio sesión con usuario válido
    Then debería ver la página de productos
```

### 2️⃣ Crear los step definitions

En `cypress/support/step_definitions/`, implementá los pasos Gherkin utilizando clases tipo Page Object:

```js
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { DemoPage } from '../../support/pages/demoPage';
const demoPage = new DemoPage();

When('inicio sesión con usuario válido', () => {
  demoPage.navegarBaseURL();
  demoPage.iniciarSesionConCredenciales();
});

Then('debería ver la página de productos', () => {
  demoPage.validarPaginaProductos();
});
```

### 3️⃣ Crear el Page Object

Definí las acciones concretas sobre la interfaz dentro de `cypress/support/pages/demoPage.js`:

```js
import { demo } from '../selectors/demoSelectors';
const data = Cypress.env('testData');

export class DemoPage {
  navegarBaseURL() {
    cy.visit("/");
  }
  iniciarSesionConCredenciales() {
    const user = Cypress.env('username');
    const pass = Cypress.env('password');
    this.ingresarUsuario(user);
    this.ingresarPassword(pass);
    this.confirmarLogin();
  }
  validarPaginaProductos() {
    cy.waitForElementVisible(demo.tituloPaginaProductos(data.pagina.tituloEsperado));
  }
  // otros métodos encapsulados...
}
```

### 4️⃣ Crear selectores centralizados

Ubicá los selectores en `cypress/support/selectors/demoSelectors.js` para mantener todo desacoplado:

```js
export const demo = {
  inputUsuario: '//input[@id="user-name"]',
  inputPassword: '//input[@id="password"]',
  btnIngresar: '//input[@id="login-button"]',
  tituloPaginaProductos: (titulo) => `//span[text()='${titulo}']`
};
```

### 5️⃣ Configurar datos dinámicos

Los datos por ambiente se cargan desde `cypress/fixtures/{ENV}/test-data.json`:

```json
{
  "pagina": {
    "tituloEsperado": "Products"
  }
}
```

Estos se exponen automáticamente como `Cypress.env('testData')` gracias al `envLoader.js`.

> ✅ Este flujo garantiza separación de responsabilidades, reutilización de código, y claridad para el mantenimiento continuo.
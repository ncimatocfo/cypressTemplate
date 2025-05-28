/**
 * Configuración central del proyecto Cypress.
 *
 * ✔ Define el patrón de specs para Cucumber (.feature).
 * ✔ Registra el archivo de soporte global.
 * ✔ Configura el preprocesador Cucumber + ESBuild.
 * ✔ Integra reporter Allure.
 * ✔ Carga variables de entorno desde archivos dinámicos (.env).
 * ✔ Define tareas personalizadas para consultas a MySQL, PostgreSQL y MongoDB.
 */

import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import allureWriter from '@shelex/cypress-allure-plugin/writer.js';
import dotenv from 'dotenv';
import { loadEnvVariables } from './cypress/config/envLoader.js';

// Clientes de base de datos
import mysql from 'mysql2/promise';
import { Client as PgClient } from 'pg';
import { MongoClient } from 'mongodb';

// Carga variables desde .env local para ejecución (en caso de no usar loader aún)
dotenv.config();

export default defineConfig({
  e2e: {
    // Configuración general de ejecución
    screenshotOnRunFailure: true,
    video: false,

    // Ruta de los archivos .feature para Cucumber
    specPattern: 'cypress/e2e/features/**/*.feature',

    // Archivo de soporte que se ejecuta antes de los tests
    supportFile: 'cypress/support/e2e.js',

    // Variables de entorno por defecto
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      version: "DEV",
      amb: "LOCAL",
            cucumber: {
        tags: ""
      }
    },

    /**
     * setupNodeEvents:
     * Función asincrónica que permite configurar listeners y plugins
     * que se ejecutan desde el entorno de Node.js (backend de Cypress).
     */
    setupNodeEvents: async (on, config) => {
      // Carga dinámica de variables desde .env y test-data.json
      config = loadEnvVariables(config);
      config.baseUrl = config.env.baseUrl;

      // 🧪 Integración con Allure Reporter
      allureWriter(on, config);

      // Reescribe allure después de cada spec si hubo fallos
      on('after:spec', (spec, results) => {
        if (results && results.stats.failures > 0) {
          allureWriter(on, config);
        }
      });

      // 📘 Configuración de Cucumber Preprocessor con soporte ESBuild
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // 🛠️ Tareas personalizadas (task) para conexión a bases de datos

      // 🔹 MySQL
      on('task', {
        queryMySQL: async (query) => {
          const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB,
            port: process.env.MYSQL_PORT || 3306
          });

          const [rows] = await connection.execute(query);
          await connection.end();
          return rows;
        },

        // 🐘 PostgreSQL
        queryPostgres: async (query) => {
          const client = new PgClient({
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASS,
            database: process.env.POSTGRES_DB,
            port: process.env.POSTGRES_PORT || 5432,
            ssl: { rejectUnauthorized: false }
          });

          await client.connect();
          const res = await client.query(query);
          await client.end();
          return res.rows;
        },

        // 🍃 MongoDB
        queryMongo: async ({ collection, operation, query }) => {
          const uri = process.env.MONGO_URI;
          const client = new MongoClient(uri);

          try {
            await client.connect();
            const db = client.db(process.env.MONGO_DB);
            const coll = db.collection(collection);

            switch (operation) {
              case 'find':
                return await coll.find(query).toArray();
              case 'insertOne':
                return await coll.insertOne(query);
              case 'updateOne':
                return await coll.updateOne(query.filter, query.update);
              case 'deleteOne':
                return await coll.deleteOne(query);
              default:
                throw new Error(`Unsupported operation: ${operation}`);
            }
          } finally {
            await client.close();
          }
        }
      });

      return config;
    },
  },
});
// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/index.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
  },
});

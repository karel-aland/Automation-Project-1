<<<<<<< HEAD
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://jira.ivorreic.com/project/board',
    env: {
      baseUrl: 'https://jira.ivorreic.com/',
    },
    defaultCommandTimeout: 30000,
    requestTimeout: 20000,
  },
});
=======
const {defineConfig} = require("cypress");

module.exports = defineConfig({
    pageLoadTimeout: 15000,

    env: {
        firstCookieValue: "firstValue",
    },

    e2e: {
        setupNodeEvents(on, config) {
            return config;
        }
    },
});
>>>>>>> f39375df4bd3fa25616f647845a3c52ab4570160

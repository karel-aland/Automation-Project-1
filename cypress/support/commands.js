<<<<<<< HEAD
// We don't want to waste time when running e2e on cypress waiting for debounced
// inputs. We can use tick() to speed up time and trigger onChange immediately.
Cypress.Commands.add('debounced', { prevSubject: true }, (input, action, value) => {
    cy.clock();
    cy.wrap(input)[action](value);
    cy.tick(1000);
});

Cypress.Commands.add('assertReloadAssert', (assertFunc) => {
    assertFunc();
    cy.reload();
    assertFunc();
  });
  
  Cypress.Commands.add('waitForXHR', (method, url, funcThatTriggersXHR) => {
    const alias = method + url;
    cy.server();
    cy.route(method, url).as(alias);
    funcThatTriggersXHR();
    cy.wait(`@${alias}`);
  });
=======
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
>>>>>>> f39375df4bd3fa25616f647845a3c52ab4570160

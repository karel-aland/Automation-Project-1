// ***********************************************************
let HEAD
// This example support/e2e.js is processed and

// This example support/index.js is processed and
const testId = 'f39375df4bd3fa25616f647845a3c52ab4570160';
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
 HEAD
// require('./commands')

// require('./commands')
describe('E2E', () => {
    const testId = 'f39375df4bd3fa25616f647845a3c52ab4570160'; 
  
    it('Check the test ID if needed', () => {
      expect(testId).to.exist; 
      expect(testId).to.equal('f39375df4bd3fa25616f647845a3c52ab4570160');
    });
  });
  

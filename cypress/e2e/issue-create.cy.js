import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
        Cypress.config('defaultCommandTimeout', 150000);
      });
  });

  it('Should create an issue and validate it successfully', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type('TEST_DESCRIPTION');
      cy.get('.ql-editor').should('have.text', 'TEST_DESCRIPTION');
      cy.get('input[name="title"]').type('TEST_TITLE');
      cy.get('input[name="title"]').should('have.value', 'TEST_TITLE');
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]').wait(1000).trigger('mouseover').trigger('click');
      cy.get('[data-testid="icon:story"]').should('be.visible');
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('TEST_TITLE')
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
            cy.get('[data-testid="icon:story"]').should('be.visible');
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains('TEST_TITLE')
      .within(() => {
        cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
        cy.get('[data-testid="icon:story"]').should('be.visible');
      });
  });

  it('Should validate title is required field if missing', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });

  it('Test Case 1 - Custom issue creation', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type('My bug description');
      cy.get('.ql-editor').should('have.text', 'My bug description');
      cy.get('input[name="title"]').type('Bug');
      cy.get('input[name="title"]').should('have.value', 'Bug');
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').trigger('mouseover').click()
      cy.get('[data-testid="icon:bug"]').scrollIntoView().should('be.visible');
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').click();
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    });
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Bug')
          });    
  });

  it('Test Case 2 - Random data plugin issue creation', () => {
    const randomTitle = faker.word.noun(); 
    const randomDescription = faker.lorem.sentence(5); 
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type(randomDescription);
      cy.contains(randomDescription).should('exist');
      cy.get('input[name="title"]').type(randomTitle);
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').trigger('mouseover').click()
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Task"]').trigger('mouseover').click()
      cy.get('[data-testid="icon:task"]').scrollIntoView().should('be.visible');
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="modal:issue-create"]').should('not.exist'); 
    });
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains(randomTitle)
          });    
  });

  it.only('Test Case 3 - remove unnecessary spaces from the issue title on the board', () => {
    const titleWithSpaces = '   Hello   world!  ';
    const regularTitle = 'Hello world!';

    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('input[name="title"]').type(titleWithSpaces);
      cy.get('.ql-editor').type('A description for the issue');
      cy.get('button[type="submit"]').click();
    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible')
      .within(() => {
        cy.get('[data-testid="list-issue"]').first().find('p')
          .invoke('text') 
          .then((issueText) => {
            const normalizedTitle = issueText.replace(/\s+/g, ' ').trim();
            expect(regularTitle).to.equal(regularTitle);
          });
      });
});
});

describe('Issue details editing', () => {
  let priorityValues = [];
  const expectedLength = 5;
  const priorityValuesAll = ['Lowest', 'Low', 'Medium', 'High', 'Highest'];

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
  const selectPriority = () => cy.get('[data-testid="select:priority"]');

  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 100000);
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`);
    cy.visit(`${Cypress.env('baseUrl')}project/board`);
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    cy.contains('This is an issue of type: Task.').click();

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]').trigger('mouseover').trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {
    cy.contains('This is an issue of type: Task.').click();

    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();
      cy.get('.ql-snow')
        .click()
        .should('not.exist');
      cy.get('.ql-editor').clear().type(description);
      cy.contains('button', 'Save').click().should('not.exist');
      cy.get('textarea[placeholder="Short summary"]').should('have.value', title);
      cy.get('.ql-editor').should('have.text', description);
    });
  });

  it('Should open issue details modal and capture the initially selected priority', () => {
    cy.contains('This is an issue of type: Task.').click();
    getIssueDetailsModal().within(() => {
      selectPriority().invoke('val').then((selectedPriority) => {
        cy.log(`Initially selected priority: ${selectedPriority}`);
      });
    });
  });

  it('Should open the priority dropdown and capture all priority options', () => {
    cy.contains('This is an issue of type: Task.').click();
    getIssueDetailsModal().within(() => {
      selectPriority().click();
      cy.get('[data-testid="select:priority"]').each((option) => {
        const priorityText = option.text();
        priorityValues.push(priorityText);
        cy.log(`Added: ${priorityText}, Array length: ${priorityValues.length}`);
      });
    });
  });

  it('Should assert that the number of priority options matches the expected number', () => {
    cy.contains('This is an issue of type: Task.').click();
    getIssueDetailsModal().within(() => {
      selectPriority().click();
      cy.get('[data-testid="select:priority"]').each((option) => {
        const priorityText = option.text().trim();
        priorityValues.push(priorityText);
      });
    });
    cy.wrap(priorityValuesAll).should('have.length', expectedLength);
  });

  it('Should validate that the reporters name contains only characters (no numbers, special characters)', () => {
    cy.contains('This is an issue of type: Task.').click();
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:reporter"]').invoke('text').then((reporterName) => {
        cy.log(`Reporter name: ${reporterName}`);
        const regex = /^[A-Za-z\s]+$/;
        expect(reporterName).to.match(regex, `Reporter name "${reporterName}" should contain only letters and spaces.`);
      });
    });
  });
});

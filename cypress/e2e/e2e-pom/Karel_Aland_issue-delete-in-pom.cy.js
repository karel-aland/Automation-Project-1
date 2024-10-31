
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  const issueTitle = 'This is an issue of type: Task.';

  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 150000);
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {  
      cy.visit(url + '/board');
      cy.contains(issueTitle, { timeout: 150000 }).click(); 
    });
  });

  it('Should delete issue successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
    cy.get(IssueModal.backlogList).should('have.length', 3);
  });

  it('Should cancel deletion process successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
    cy.get(IssueModal.backlogList).should('have.length', 4);
  });
});

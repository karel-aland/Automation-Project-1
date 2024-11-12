describe('Time estimation and time logging functionalities', () => {
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const getTrackingModal = () => cy.get('[data-testid="modal:tracking"]');

    beforeEach(() => {
        Cypress.config('defaultCommandTimeout', 100000);
        cy.visit(`${Cypress.env('baseUrl')}project/board`);
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`);
    });

    it('Should add a time estimate successfully', () => {
        const initialEstimate = '2 hours';  
        const initialEstimateVis = '2h estimated';  

        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .should('be.visible', { timeout: 30000 })
            .and('not.have.class', 'hidden');

        getIssueDetailsModal().within(() => {
            cy.contains('Original Estimate (hours)').should('be.visible');
            cy.get('input[placeholder="Number"]')
                .should('be.visible')  
                .type(initialEstimate); 
        });

        cy.get('[data-testid="icon:stopwatch"]').click();
        getTrackingModal()
            .should('be.visible', { timeout: 10000 })
            .within(() => {
                cy.contains(initialEstimateVis).should('be.visible');
            });
    });

    it('Should edit time estimate successfully', () => {
        const updatedEstimate = '3 hours';  
        const updatedEstimateVis = '3h estimated'; 

        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .should('be.visible', { timeout: 30000 })
            .and('not.have.class', 'hidden'); 
        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]')
                .should('be.visible') 
                .type(updatedEstimate);
        });

        cy.get('[data-testid="icon:stopwatch"]').click();
        getTrackingModal()
            .should('be.visible', { timeout: 10000 })
            .within(() => {
                cy.contains(updatedEstimateVis).should('be.visible');
            });
    });

    it('Should remove time estimate successfully', () => {
        const deletedEstimate = '0 hours';
        const deletedEstimateVis = '0h estimated';

        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .should('be.visible', { timeout: 30000 })
            .and('not.have.class', 'hidden'); 
        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]')
                .should('be.visible')
                .clear() 
                .type(deletedEstimate, { force: true });
        });

        cy.get('[data-testid="icon:stopwatch"]').click();
        getTrackingModal()
            .should('be.visible', { timeout: 10000 }) 
            .within(() => {
                cy.contains(deletedEstimateVis).should('be.visible'); 
            });
    });

    it('Should log time spent successfully', () => {
        const initialLog = '2 hours';
        const initialLogVis = '2h logged';

        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .should('be.visible', { timeout: 30000 })
            .and('not.have.class', 'hidden');
        cy.get('[data-testid="icon:stopwatch"]').click();
        getTrackingModal()
            .should('be.visible', { timeout: 10000 });

        cy.contains('Time spent (hours)').should('be.visible');
        cy.get('[data-testid="modal:tracking"] input[placeholder="Number"]')
            .eq(0)
            .should('be.visible')
            .type(initialLog);

        getTrackingModal()
            .should('be.visible', { timeout: 10000 })
            .within(() => {
                cy.contains(initialLogVis).should('be.visible');
            });
    });

    it('Should edit time spent successfully', () => {
        const initialLog = '2 hours';
        const updatedLog = '3 hours';
        const updatedLogVis = '3h logged';

        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .should('be.visible', { timeout: 30000 })
            .and('not.have.class', 'hidden');
        cy.get('[data-testid="icon:stopwatch"]').click();
        getTrackingModal()
            .should('be.visible', { timeout: 10000 });

        cy.contains('Time spent (hours)').should('be.visible');
        cy.get('[data-testid="modal:tracking"] input[placeholder="Number"]')
            .eq(0)
            .should('be.visible')
            .type(initialLog);

        getTrackingModal()
            .should('be.visible', { timeout: 10000 })
            .within(() => {
                cy.contains('2h logged').should('be.visible');
            });

        getTrackingModal()
            .should('be.visible', { timeout: 10000 });

        cy.get('[data-testid="modal:tracking"] input[placeholder="Number"]')
            .eq(0)
            .clear()
            .type(updatedLog);

        getTrackingModal()
            .should('be.visible', { timeout: 10000 })
            .within(() => {
                cy.contains(updatedLogVis).should('be.visible');
            });
    });

    it('Should delete time spent successfully', () => {
        const initialLog = '2 hours';
        const deletedLog = '0 hours';
        const deletedLogVis = 'No time logged';

        cy.contains('This is an issue of type: Task.').click();
        getIssueDetailsModal()
            .should('be.visible', { timeout: 30000 })
            .and('not.have.class', 'hidden');
        cy.get('[data-testid="icon:stopwatch"]').click();
        getTrackingModal()
            .should('be.visible', { timeout: 10000 });

        cy.contains('Time spent (hours)').should('be.visible');
        cy.get('[data-testid="modal:tracking"] input[placeholder="Number"]')
            .eq(0)
            .should('be.visible')
            .type(initialLog);

        getTrackingModal()
            .should('be.visible', { timeout: 10000 })
            .within(() => {
                cy.contains('2h logged').should('be.visible');
            });

        getTrackingModal()
            .should('be.visible', { timeout: 10000 });

        cy.get('[data-testid="modal:tracking"] input[placeholder="Number"]')
            .eq(0)
            .clear()
            .type(deletedLog, { force: true });

        getTrackingModal()
            .should('be.visible', { timeout: 10000 })
            .within(() => {
                cy.contains(deletedLogVis).should('be.visible');
            });
    });
});

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('input[placeholder="John"').type('Karel')
        cy.get('#lastName').type('Aland')
        cy.get('#email.input').type('karel.aland97@gmail.com')
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123123')
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message')
        cy.get('input[name="password"]').scrollIntoView()
        cy.get('input[name="password"]').clear()
        cy.get('input[name="password"]').type('password')
        cy.get('[name="confirm"]').scrollIntoView()
        cy.get('[name="confirm"]').clear()
        cy.get('[name="confirm"]').type('password')
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
    
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('input[placeholder="John"').type('Karel')
        cy.get('#lastName').type('Aland')
        cy.get('#email.input').type('karel.aland97@gmail.com')
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle2.checkbox.vehicles').click()
        cy.get('#cars').select("Audi")
        cy.get('#animal').select("Hippo")
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('have.css', 'display', 'block')
        
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('johnDoe')
        cy.get('input[placeholder="John"')
        cy.get('#lastName')
        cy.get('#email.input')
        cy.get('#username')
        cy.get('[data-testid="phoneNumberTestId"]')
        cy.get('input[name="password"]')
        cy.get('[name="confirm"]')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('have.css', 'display', 'block')
        
        
    })

    it('User cannot submit form when e-mail is missing', ()=>{
        cy.get('input[placeholder="John"').type('Karel')
        cy.get('#lastName').type('Aland')
        cy.get('#email.input').type('karel.aland97@gmail.com')
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        cy.get('#lastName').scrollIntoView()
        cy.get('#lastName').clear().click()
        cy.get('.submit_button').should('be.disabled')

    // This test revealed a bug in the form - submit button is visible when mandatory field(s) are not filled.
    // Tried several fields in this test(last name, e-mail), but the submit button was available in both cases.
})

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
        
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        
    })
    

    it('Check navigation part Registration form 3', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')    
        cy.go('back')
    })
    
        
    

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox button list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)

        //Confirm checkbox buttons labels
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        //Confirm checkbox buttons default state
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        //Selecting one will not remove selection from the other radio button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    });

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Confirm that animal dropdown is correct', () => {
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
    });
    

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}
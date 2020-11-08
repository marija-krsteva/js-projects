describe('Loan Calculator', () => {
    beforeEach(() => {
        cy.visit('/projects/loan_calculator/');
    });

    it('checks that loader and results are hidden', () => {
        cy.get('.error').should('not.exist');
        cy.get('#results').should('not.be.visible');
        cy.get('#loading').should('not.be.visible');  
    });

    it('checks if error appears when inputs empty', () => {
        cy.get('#submit').click();
        cy.get('#loading').should('be.visible');
        cy.wait(1500);
        cy.get('#loading').should('not.be.visible');
        cy.get('#results').should('not.be.visible');
        cy.get('.error').should('exist');
        cy.wait(3000);
        cy.get('.error').should('not.exist');
    });

    it('checks if error appears when calculation fails', () => {
        cy.get('#amount').type('5');
        cy.get('#interest').type('5');
        cy.get('#years').type('0');
        cy.get('#submit').click();
        cy.get('#loading').should('be.visible');
        cy.wait(1500);
        cy.get('#loading').should('not.be.visible');
        cy.get('#results').should('not.be.visible');
        cy.get('.error').should('exist');
        cy.wait(3000);
        cy.get('.error').should('not.exist');
    });

    it('checks if calculation shows when correct', () => {
        cy.get('#amount').type('5000');
        cy.get('#interest').type('5');
        cy.get('#years').type('1');
        cy.get('#submit').click();
        cy.get('#loading').should('be.visible');
        cy.wait(1500);
        cy.get('#loading').should('not.be.visible');
        cy.get('#results').should('be.visible');
        cy.get('.error').should('not.exist');
        cy.get('#monthly-payment').invoke('val').should("not.be.empty")
        cy.get('#monthly-payment').should('be.disabled');
        cy.get('#monthly-payment').invoke('val').should("not.be.empty")
        cy.get('#monthly-payment').should('be.disabled');
        cy.get('#monthly-payment').invoke('val').should("not.be.empty")
        cy.get('#monthly-payment').should('be.disabled');
    });
});
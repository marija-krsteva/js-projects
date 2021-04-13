describe('Weather App', () => {
    beforeEach(() => {
        cy.visit('/projects/weather_app/');
    });

    it('checks if default city loads', () => {
        cy.get('#w-location').contains('Skopje');
    });

    it('checks if city changes', () => {
        cy.get('.modal-dialog').should('not.be.visible');
        
        cy.get('#w-location').contains('Skopje');
        cy.get('#locaModal').click();
        cy.get('.modal-dialog').should('be.visible');
        cy.get('#city').invoke('val', 'Glasgow');
        cy.wait(500);
        cy.get('#w-change-btn').click().should(() => {
            expect(localStorage.getItem('city')).to.eq('Glasgow');
        });
    
        cy.get('.modal-dialog').should('not.be.visible');
        cy.get('#w-location').contains('Glasgow');
    });

    it('checks if error appears', () => {
        cy.get('#locaModal').click();
        cy.get('.modal-dialog').should('be.visible');
        cy.get('#city').invoke('val', 'Abc');
        cy.wait(500);
        cy.get('#w-change-btn').click().should(() => {
            expect(localStorage.getItem('city')).to.not.eq('Abc');
        });
    
        cy.get('.modal-dialog').should('not.be.visible');
        cy.get('.error').contains('Error occured while retreaving data');
        cy.wait(5000);
        cy.get('.error').should('not.exist');

        cy.get('#w-location').should('not.contain', 'Abc');
    });
});
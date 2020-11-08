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
        cy.get('#city').type('Vilnius');
        cy.get('#w-change-btn').click().should(() => {
            expect(localStorage.getItem('city')).to.eq('Vilnius')
        });
        cy.get('.modal-dialog').should('not.be.visible');
        cy.get('#w-location').contains('Vilnius');
    });
});
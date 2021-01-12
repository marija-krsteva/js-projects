describe('State Pattern', () => {
    beforeEach(() => {
        cy.visit('/projects/state_pattern/');
    });

    it('checks if app starts on home page', () => {
        cy.get('#heading').should('be.empty');
        cy.get('#carouselExampleIndicators').should('exist').and('be.visible');
    });

    it('checks if app changes to about page', () => {
        cy.get('#about').click();
        cy.get('#heading').contains('About us');
        cy.get('#content').contains('This is the about page')
    });

    it('checks if app hanges to contact page', () => {
        cy.get('#contact').click();
        cy.get('#heading').contains('Contact us');
        cy.get('#contact_form').should('exist').and('be.visible');
    });
});
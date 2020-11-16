describe('User Form Validation', () => {
    beforeEach(() => {
        cy.visit('/projects/profile_scroller/');
    });

    it('checks if first profile appears on load', () => {
        cy.get('.list-group').children().should('have.length', 4);
        cy.get('#imageDisplay').children().should('have.length', 1);
    });

    it('checks if new profile appears when Next clicked', () => {
        cy.get('.list-group-item').should(($lis) => {
            expect($lis.eq(0)).to.contain('Name: John Doe');
            expect($lis.eq(1)).to.contain('Age: 32');
            expect($lis.eq(2)).to.contain('Location: Boston MA');
            expect($lis.eq(3)).to.contain('Preference: male looking for female');
        });
        cy.get('#imageDisplay').children().should('have.length', 1);

        cy.get('#next').click();

        cy.get('.list-group-item').should(($lis) => {
            expect($lis.eq(0)).to.contain('Name: Jen Smith');
            expect($lis.eq(1)).to.contain('Age: 26');
            expect($lis.eq(2)).to.contain('Location: Miami FL');
            expect($lis.eq(3)).to.contain('Preference: female looking for male');
        });
        cy.get('#imageDisplay').children().should('have.length', 1);
    });
    
    it('checks if page reloads if all profiles are seen', () => {
        cy.window().then(w => w.beforeReload = true);
        cy.window().should('have.prop', 'beforeReload', true);
        cy.get('#next').click();
        cy.get('#next').click();
        cy.get('#next').click();
        cy.window().should('not.have.prop', 'beforeReload')
    });

});

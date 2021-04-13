describe('GitHub Users Finder', () => {
    beforeEach(() => {
        cy.visit('/projects/github_finder/');
    });

    it('checks if user info gets fetched', () => {
        cy.get('#searchUser').type('a');
        cy.get('#profile').should('exist');
        cy.get('#repos').should('be.visible').find('div');
        cy.get('#searchUser').clear();
        cy.get('#repos').should('not.exist');
        cy.get('#profile').should('be.empty');
    });

    it('shows error if no user is found', () => {
        cy.get('#searchUser').type('4589iutoiy72euiiujjudjf432432132153432423fdefdsrefreferfrcdscs534');
        cy.get('.alert-danger').should('exist').and('be.visible');
        cy.get('#repos').should('not.exist');
        cy.get('#profile').should('be.empty');
        cy.wait(3000);
        cy.get('.alert-danger').should('not.exist');
    });
});
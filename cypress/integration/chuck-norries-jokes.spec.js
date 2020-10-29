beforeEach(() => {
    cy.visit('/projects/chuck_norris_jokes/');
});

it('checks if input, button and ul exists', () => {
    cy.get('#number').should('exist');
    cy.get('.get-jokes').should('exist');
    cy.get('.jokes').should('exist'); 
});

it('checks if returns proper number of jokes', () => {
    cy.get('#number').type(3);
    cy.get('.get-jokes').click();
    cy.get('.jokes').children().should('have.length', 3);
});

it('checks if shows error for nonpositive numbers or 0', () => {
    cy.get('#number').type(-10);
    cy.get('.get-jokes').click();
    cy.get('.jokes').children()
        .should('have.length', 1)
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .contains('Only positive numbers, please');
});

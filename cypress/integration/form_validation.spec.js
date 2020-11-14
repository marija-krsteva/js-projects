describe('User Form Validation', () => {
    beforeEach(() => {
        cy.visit('/projects/form_validation/');
    });

    it('checks if errors appears when name is incorrect', () => {
        cy.get('#name').clear().type('a').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Name must be between 2 and 10 characters');

        cy.get('#name').clear().type('ab').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#name').clear().type('AB9').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Name must be between 2 and 10 characters');

        cy.get('#name').clear().type('Ma').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#name').clear().type('M9._+').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Name must be between 2 and 10 characters');

        cy.get('#name').clear().type('MarijaKrst').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#name').clear().type('Marija Krs').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Name must be between 2 and 10 characters');
        
        cy.get('#name').clear().type('marijakrst').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#name').clear().type('marijakrsteva').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Name must be between 2 and 10 characters');
    });

    it('checks if errors appears when zipcode is incorrect', () => {
        cy.get('#zip').clear().type('a').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid Zipcode');

        cy.get('#zip').clear().type('1').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid Zipcode');

        cy.get('#zip').clear().type('abcde').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid Zipcode');

        cy.get('#zip').clear().type('11111').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#zip').clear().type('1111-2').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid Zipcode');

        cy.get('#zip').clear().type('11111-2222').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#zip').clear().type('111122222').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid Zipcode');
        
        cy.get('#zip').clear().type('1234-12345').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid Zipcode');

        cy.get('#zip').clear().type('abcd-efghi').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid Zipcode');
    });
    
    it('checks if errors appears when email is incorrect', () => {
        cy.get('#email').clear().type('a').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid email');

        cy.get('#email').clear().type('1@a').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid email');

        cy.get('#email').clear().type('-_.@a.co').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#email').clear().type('abc@def').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid email');

        cy.get('#email').clear().type('abc@def.gh').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#email').clear().type('a@b.c').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid email');
        
        cy.get('#email').clear().type('a@b.cdefgh').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid email');

        cy.get('#email').clear().type('1@2.com').blur();
        cy.get('.invalid-feedback').should('not.be.visible');
    });

    it('checks if errors appears when phone is incorrect', () => {
        cy.get('#phone').clear().type('abc-123-1234').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid phone number');

        cy.get('#phone').clear().type('123-abc-1234').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid phone number');

        cy.get('#phone').clear().type('1112223333').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#phone').clear().type('123-123-abcd').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid phone number');

        cy.get('#phone').clear().type('111-222-3333').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#phone').clear().type('(111)-222-3333').blur();
        cy.get('.invalid-feedback').should('not.be.visible');
        
        cy.get('#phone').clear().type('(111)-2223333').blur();
        cy.get('.invalid-feedback').should('not.be.visible');
        
        cy.get('#phone').clear().type('(111)2223333').blur();
        cy.get('.invalid-feedback').should('not.be.visible');
        
        cy.get('#phone').clear().type('111.222.3333').blur();
        cy.get('.invalid-feedback').should('not.be.visible');
        
        cy.get('#phone').clear().type('(111).222.3333').blur();
        cy.get('.invalid-feedback').should('not.be.visible');

        cy.get('#phone').clear().type('123-123-12345').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid phone number');

        cy.get('#phone').clear().type('1234-123-1234').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid phone number');

        cy.get('#phone').clear().type('123-1234-1234').blur();
        cy.get('.invalid-feedback').should('be.visible').contains('Enter a valid phone number');
    });

});

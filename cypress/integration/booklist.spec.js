beforeEach(() => {
    cy.visit('/booklist/');
});

it('checks if error appears when inputs empty', () => {
    cy.get('#submit').click();
    cy.get('.error').should('be.visible').contains('Please fill in all fields');
    cy.wait(3000);
    cy.get('.error').should('not.be.visible');
});

it('checks if Book inputed and in storage', () => {
    cy.get('#title').type('Book One');
    cy.get('#author').type('Author One');
    cy.get('#isbn').type('123');
    cy.get('#submit').click();
    cy.get('.success').contains('Book added').should('be.visible').and(() => {
        expect(localStorage.getItem('books')).to.eq('[{"title":"Book One","author":"Author One","isbn":"123"}]');
    });
    cy.wait(3000);

    cy.get('.success').should('not.be.visible');
    cy.get('#book-table').contains('td', 'Book One');
    cy.get('#book-table').contains('td', 'Author One');
    cy.get('#book-table').contains('td', '123');
    cy.get('#title').should('have.value', '');
    cy.get('#author').should('have.value', '');
    cy.get('#isbn').should('have.value', '');
    cy.reload();

    cy.get('#book-table').contains('td', 'Book One');
    cy.get('#book-table').contains('td', 'Author One');
    cy.get('#book-table').contains('td', '123');
});

it('checks if Book can\'t be inputed if same ISBN', () => {
    cy.get('#title').type('Book One');
    cy.get('#author').type('Author One');
    cy.get('#isbn').type('123');
    cy.get('#submit').click();
    cy.get('#title').type('Book Two');
    cy.get('#author').type('Author Two');
    cy.get('#isbn').type('123');
    cy.get('#submit').click();
    cy.get('.error').should('be.visible').contains('There is already a book with that ISBN#').and(() => {
        expect(localStorage.getItem('books')).to.eq('[{"title":"Book One","author":"Author One","isbn":"123"}]');
    });
});

it('deletes books from UI and LS', () => {
    cy.get('#title').type('Book One');
    cy.get('#author').type('Author One');
    cy.get('#isbn').type('123');
    cy.get('#submit').click();

    cy.get('.success').should('be.visible').contains('Book added').and(() => {
        expect(localStorage.getItem('books')).to.eq('[{"title":"Book One","author":"Author One","isbn":"123"}]');
    });

    cy.get('.delete').click();
    cy.get('.success').should('be.visible').contains('Book removed!').and(() => {
        expect(localStorage.getItem('books')).to.eq('[]');
    });
    cy.get('#book-table > tr').should('not.exist');
});
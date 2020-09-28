it('checks if todo not inputed', () => {
    cy.visit('/task-list/');
    cy.get('.toast').should('not.exist');
    cy.get('#task').invoke('val').should("be.empty");
    cy.get('#task-form').then(form$ => {
        form$.on('submit', e => {
          e.preventDefault();
       });
    });
    cy.get('#task-form').submit();
    cy.get('.toast').should('exist');
    cy.wait(1600);
    cy.get('.toast').should('not.exist');
});  

it('checks if error appears when calculation fails', () => {
    cy.visit('/loan-calculator/');
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

it('checks if todo inputed', () => {
    cy.visit('/task-list/');
    cy.get('#task').type('write tests{enter}');
    cy.get('.collection-item').should(($lis) => {
        expect($lis.eq(0)).to.contain('write tests');
        expect(localStorage.getItem('tasks')).to.eq('["write tests"]');
      });
});

it('checks if todo stays after reload', () => {
    cy.visit('/task-list/');
    cy.get('#task').type('write tests{enter}');
    cy.get('.collection-item').should(($lis) => {
        expect($lis.eq(0)).to.contain('write tests');
        expect(localStorage.getItem('tasks')).to.eq('["write tests"]');
    });
    cy.reload();
    cy.get('.collection-item').should(($lis) => {
        expect($lis.eq(0)).to.contain('write tests');
        expect(localStorage.getItem('tasks')).to.eq('["write tests"]');
    });
});

it('checks if todo gets removed', () => {
    cy.visit('/task-list/');
    cy.get('#task').type('write tests{enter}');
    cy.get('.collection-item').should(($lis) => {
        expect($lis.eq(0)).to.contain('write tests');
        expect(localStorage.getItem('tasks')).to.eq('["write tests"]');
    });
    cy.get('.delete-item').click();
    cy.get('.modal').should('be.visible');
    cy.get('.confirm').should('be.visible').click();
    cy.get('.collection-item').should('not.exist').then(() =>{
        expect(localStorage.getItem('tasks')).to.not.equal('["write tests"]');
    });
});

it('checks if all todos get removed', () => {
    cy.visit('/task-list/');
    cy.get('#task').type('write tests{enter}');
    cy.get('#task').type('write more tests{enter}');
    cy.get('.collection-item').should(($lis) => {
        expect($lis.eq(0)).to.contain('write tests');
        expect($lis.eq(1)).to.contain('write more tests');
        expect(localStorage.getItem('tasks')).to.eq('["write tests","write more tests"]');
    });
    cy.get('.clear-tasks').click();
    cy.get('.modal').should('be.visible');
    cy.get('.confirm').should('be.visible').click();
    cy.get('.collection-item').should('not.exist');
    cy.window().its("sessionStorage").invoke("getItem", "tasks").should("not.exist");
});
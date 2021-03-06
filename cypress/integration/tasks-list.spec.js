describe('Taks List', () => {
    beforeEach(() => {
        cy.visit('/projects/task_list/');
    });

    it('checks if todo not inputed', () => {
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

    it('checks if todo inputed', () => {
        cy.get('#task').type('write tests{enter}');
        cy.get('.collection-item').should(($lis) => {
            expect($lis.eq(0)).to.contain('write tests');
            expect(localStorage.getItem('tasks')).to.eq('["write tests"]');
        });
    });

    it('checks if todo stays after reload', () => {
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
});
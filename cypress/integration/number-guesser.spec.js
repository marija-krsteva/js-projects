beforeEach(() => {
    cy.visit('/projects/number-guesser/');
});

it('checks if game starts correctly', () => {
    cy.get('#guess-input').should('have.value','');
    cy.get('#guess-btn').should('have.value','Submit');
    cy.get('.min-num').then(($min) => {
        const min = $min.text();
        cy.get('.max-num').then(($max) => {
            const max = $max.text();
            cy.window().its('winningNum').then(($winningNum) => {
                const winningNum = $winningNum;
                assert.isAtLeast(winningNum, Number(min));
                assert.isAtMost(winningNum, Number(max));
            });
        });
    });    
});

it('checks if invalid input', () => {
    cy.window().its('winningNum').then(($winningNum) => {
        const guessedNum = $winningNum == 10 ? 9 : 10;

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `Please enter a number between 1 and 10`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type('-1');
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `Please enter a number between 1 and 10`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type('11');
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `Please enter a number between 1 and 10`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');
        cy.get('#guess-btn').should('have.value','Submit');
        cy.get('#guess-input').should('not.be.disabled');

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type(guessedNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `${guessedNum} is not correct, 2 guesses left`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');
    });   
});
  

it('checks if game lost', () => {
    cy.window().its('winningNum').then(($winningNum) => {
        const guessedNum = $winningNum == 10 ? 9 : 10;

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type(guessedNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `${guessedNum} is not correct, 2 guesses left`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type(guessedNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `${guessedNum} is not correct, 1 guesses left`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type(guessedNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `Game Over, you lost. The correct number was ${$winningNum}`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');
        cy.get('#guess-btn').should('have.value','Play Again');
        cy.get('#guess-input').should('be.disabled');

        cy.window().then(w => w.beforeReload = true);
        cy.window().should('have.prop', 'beforeReload', true)
        cy.get('#guess-btn').click();
        cy.window().should('not.have.prop', 'beforeReload');

        cy.get('.message').should('not.have.css', 'color', 'rgb(255, 0, 0)').and('have.text', '');
        cy.get('#guess-input').should('not.have.css', 'borderColor', 'rgb(255, 0, 0)');
        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-btn').should('have.value','Submit');
    });   
});

it('checks if game won after 3 guesses', () => {
    cy.window().its('winningNum').then(($winningNum) => {
        const guessedNum = $winningNum == 10 ? 9 : 10;

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type(guessedNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `${guessedNum} is not correct, 2 guesses left`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type(guessedNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `${guessedNum} is not correct, 1 guesses left`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type($winningNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(0, 128, 0)').and('have.text', `${$winningNum} is correct, you win!`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(0, 128, 0)');
        cy.get('#guess-btn').should('have.value','Play Again');
        cy.get('#guess-input').should('be.disabled');

        cy.window().then(w => w.beforeReload = true);
        cy.window().should('have.prop', 'beforeReload', true)
        cy.get('#guess-btn').click();
        cy.window().should('not.have.prop', 'beforeReload');

        cy.get('.message').should('not.have.css', 'color', 'rgb(0, 128, 0)').and('have.text', '');
        cy.get('#guess-input').should('not.have.css', 'borderColor', 'rgb(0, 128, 0)');
        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-btn').should('have.value','Submit');
    });   
});

it('checks if game won first try', () => {
    window.winningNum = 5;
    cy.window().its('winningNum').then(($winningNum) => {
        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type($winningNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(0, 128, 0)').and('have.text', `${$winningNum} is correct, you win!`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(0, 128, 0)');
        cy.get('#guess-btn').should('have.value','Play Again');
        cy.get('#guess-input').should('be.disabled');

        cy.window().then(w => w.beforeReload = true);
        cy.window().should('have.prop', 'beforeReload', true)
        cy.get('#guess-btn').click();
        cy.window().should('not.have.prop', 'beforeReload');

        cy.get('.message').should('not.have.css', 'color', 'rgb(0, 128, 0)').and('have.text', '');
        cy.get('#guess-input').should('not.have.css', 'borderColor', 'rgb(0, 128, 0)');
        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-btn').should('have.value','Submit');
    });   
});

it('checks if game won after 2 guesses', () => {
    cy.window().its('winningNum').then(($winningNum) => {
        const guessedNum = $winningNum == 10 ? 9 : 10;

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type(guessedNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)').and('have.text', `${guessedNum} is not correct, 2 guesses left`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(255, 0, 0)');

        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-input').type($winningNum);
        cy.get('#guess-btn').click();
        cy.get('.message').should('have.css', 'color', 'rgb(0, 128, 0)').and('have.text', `${$winningNum} is correct, you win!`);
        cy.get('#guess-input').should('have.css', 'borderColor', 'rgb(0, 128, 0)');
        cy.get('#guess-btn').should('have.value','Play Again');
        cy.get('#guess-input').should('be.disabled');

        cy.window().then(w => w.beforeReload = true);
        cy.window().should('have.prop', 'beforeReload', true)
        cy.get('#guess-btn').click();
        cy.window().should('not.have.prop', 'beforeReload');

        cy.get('.message').should('not.have.css', 'color', 'rgb(0, 128, 0)').and('have.text', '');
        cy.get('#guess-input').should('not.have.css', 'borderColor', 'rgb(0, 128, 0)');
        cy.get('#guess-input').should('have.value','');
        cy.get('#guess-btn').should('have.value','Submit');
    });   
});
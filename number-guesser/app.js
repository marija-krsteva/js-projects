/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    guessesLeft = 3;
var winningNum = getRandomNum(min, max);

// UI Elements
const game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
   let guess = parseInt(guessInput.value);

   // Validate
   if(isNaN(guess) || guess < min || guess > max) {
       setMessage(`Please enter a number between ${min} and ${max}`, 'red');
       guessInput.value = '';
       return 0;
   }

   // Check if won
   if(guess === winningNum) {
        gameOver(true, `${winningNum} is correct, you win!`);
   } else {
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            // Game over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            // Game continues - answer wrong

            // Clear input
            guessInput.value = '';
            // Set message
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
   }
});

// Get winning number
function getRandomNum(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

// Game over
function gameOver(won, msg) {
    let color = won ? 'green' : 'red';
    // Disable input
    guessInput.disabled = true;
    setMessage(msg, color);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-again'; 
}

// Set message
function setMessage(msg, color) {
    // Change text color
    message.style.color = color;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    message.textContent = msg;
}
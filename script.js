const words = ['hangman', 'javascript', 'developer', 'programming', 'web'];

let word = '';
let guessedWord = '';
let guessesLeft = 6;
let guessedLetters = [];

function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedWord = '_'.repeat(word.length);
    guessesLeft = 6;
    guessedLetters = [];

    updateDisplay();
}

function updateDisplay() {
    document.getElementById('wordContainer').textContent = guessedWord;
    document.getElementById('guesses').textContent = guessesLeft;

    const lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i); // ASCII code for lowercase letters
        const span = document.createElement('span');
        span.textContent = letter;
        span.addEventListener('click', () => guessLetter(letter));
        lettersContainer.appendChild(span);
    }

    const message = document.getElementById('message');
    message.textContent = '';

    if (guessedWord === word) {
        message.textContent = 'You won! Play again?';
    } else if (guessesLeft === 0) {
        message.textContent = `Game over! The word was "${word}". Play again?`;
    }
}

function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!word.includes(letter)) {
            guessesLeft--;
        } else {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    guessedWord = guessedWord.substring(0, i) + letter + guessedWord.substring(i + 1);
                }
            }
        }
        updateDisplay();
    }
}

function checkGuess() {
    const guessInput = document.getElementById('guessInput').value.toLowerCase();
    if (guessInput.length === 1 && /^[a-z]+$/.test(guessInput)) {
        guessLetter(guessInput);
        document.getElementById('guessInput').value = '';
    } else {
        alert('Please enter a single lowercase letter.');
    }
}

function resetGame() {
    startGame();
}

startGame();

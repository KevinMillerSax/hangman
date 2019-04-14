/*----- constants ------ */
const MAX_WRONG_GUESSES = 6;
const WORDS = [
    'CAT', 'DOG', 'OCTOPUS', 'RABBIT', 'OSTRICH', 'ELEPHANT', 'LION',
    'GIRAFFE', 'COW', 'LEMUR', 'JELLYFISH', 'SHARK', 'TIGER', 'FALCON'
];

/*------- app's state (variables)--------*/
let usedLetters, wrongGuesses, secret, guess;


/*----------- chached element references -------*/
const letterBtns = document.querySelectorAll('#letters button');
const hangmanImg = document.querySelector('section');
const guessEl = document.getElementById('guess');
const msgEl = document.querySelector('h2');
const replayBtn = document.getElementById('replay');


/*------- event listeners --------*/
document.getElementById('letters').addEventListener('click', handleLetterClick);
replayBtn.addEventListener('click', init);



/*------- functions ------- */
  
init();


function init(){
    //usedLetters, wrongGuesses, secret, guess;
    usedLetters = [];
    wrongGuesses = [];
    let randomIdx = Math.floor(Math.random() * WORDS.length);
    secret = WORDS[randomIdx];
    console.log(secret);
    guess = '_'.repeat(secret.length);
    render();
}

function render(){
    guessEl.textContent = guess;
    hangmanImg.style.backgroundPosition = `${-75 * wrongGuesses.length}px 0`;
    if (guess === secret){
        msgEl.textContent = 'Congrats, I guessed the word!';
    } else if (wrongGuesses.length === MAX_WRONG_GUESSES){
        msgEl.textContent = "Sorry, you've been hung";
    } else msgEl.textContent = "Good Luck!";
    letterBtns.forEach(function(btn){
        if (usedLetters.includes(btn.textContent)){
            btn.setAttribute('disabled', true);
        } else{
            btn.removeAttribute('disabled');
        }
        if (wrongGuesses.includes(btn.textContent)){
            btn.style.backgroundColor = 'red';
        } else if (usedLetters.includes(btn.textContent)){
            btn.style.backgroundColor = 'royalblue';
        }
        else{
            btn.style.backgroundColor = 'white';
        }
    });
    replayBtn.style.visibility = (wrongGuesses.length === MAX_WRONG_GUESSES || guess === secret) ?
    'visible' : 'hidden'; 
}

function handleLetterClick(evt){
    if(evt.target.tagName !== 'BUTTON' || wrongGuesses.length === MAX_WRONG_GUESSES || secret === guess){
        return ;
    }
    let letter = evt.target.textContent;
    let guessChars = guess.split('');
    if (secret.includes(letter)){
        for (let i = 0; i < secret.length; i++){
            let char = secret.charAt(i);
            if (char === letter) {
                guessChars[i] = letter;
            } 
        }
        guess = guessChars.join('');
    } else{
        wrongGuesses.push(letter);
    }
    usedLetters.push(letter);
    render();
}
'use strict';
const maxGuessValue=Number(document.querySelector('.max').textContent); //1
const minGuessValue=Number(document.querySelector('.min').textContent); //20
let number =  Math.floor(Math.random()*maxGuessValue)+minGuessValue;  // <1;20>
//document.querySelector('.number').textContent=number; // for tests set this random number visible  in the center of the app
let lastGuessed = maxGuessValue+1; //set the last guessed value to protect the user from checking the same value many times in a row
let blocked = false; //not working. wanted to implement some kind of delay between clicks, but that can be managed with lastGuessed, right?
let highScore = Number(document.querySelector('.highscore').textContent);
let score = Number(document.querySelector('.score').textContent)


const endGame = function (){
    document.querySelector('body').style.backgroundColor='red';
    document.querySelector('.message').textContent="you lose, sorry"
    blocked=true;
    //  setTimeout(restart, 1000);
}
const decrementScore = function(){
    if (score-1 < 1) endGame();
    score--;
    document.querySelector('.score').textContent=score-1;
}

const restart = function(){

    number =  Math.floor(Math.random()*maxGuessValue)+minGuessValue; //set new random value
    document.querySelector('.score').textContent=maxGuessValue; // set score back
    document.querySelector('.message').textContent="Start guessing..." // set text back
    document.querySelector('body').style.backgroundColor='#222' // set background back to dark
    document.querySelector('.number').textContent="?" // set visible number back to "?"
    blocked=false;
}
const checkValue = function(){ 
    let guessNumber = Number(document.querySelector('.guess').value);
    if (blocked) return; 
    if (guessNumber>maxGuessValue || guessNumber<minGuessValue || !guessNumber) {
        console.log("bad input")
        document.querySelector('.message').textContent=`put a value between ${minGuessValue} and ${maxGuessValue} into input and click \"ckeck\"`;
        return;
    }
    if (!guessNumber) return;
    if (lastGuessed===guessNumber) return ; // if u type same number more than twice in a row (why would you do such silly thing)
    //then don't do nothing


    if (guessNumber === number){ // if you win
        document.querySelector('.number').textContent=number;
        document.querySelector('body').style.backgroundColor='green';
        document.querySelector('.message').textContent="you guessed it!"
        if (score>highScore)
                document.querySelector('.highscore').textContent=score;
        blocked=true;
        // setTimeout(restart, 1000);

    }
    else if (guessNumber>number){ //too high
        document.querySelector('.message').textContent="too high"
        decrementScore(-1);
    }
    else { //too low
        document.querySelector('.message').textContent="too low"
        decrementScore(-1);
    }
    //remember last picked number to not type it right again
     lastGuessed = guessNumber;
}
restart();
document.querySelector('.check').addEventListener('click', checkValue);
document.querySelector('.again').addEventListener('click', restart);
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// constants

const SCORE1 = document.getElementById('score-0');
const SCORE2 = document.getElementById('score-1');
const CURRENT1 = document.getElementById('current-0');
const CURRENT2 = document.getElementById('current-1');
const GOAL = document.getElementById('goal');
const WRAPPER1 = document.getElementsByClassName('player-0-panel')[0];
const WRAPPER2 = document.getElementsByClassName('player-1-panel')[0];
const DICE = document.getElementsByClassName('dice')[0];

let targetScore = null;
GOAL.innerHTML = targetScore;

var player1Turn = true;
var currentScore = 0;
var player1Score = 0;
var player2Score = 0;

// reset state
function start(){
    SCORE1.innerHTML = 0;
    SCORE2.innerHTML = 0;
    CURRENT1.innerHTML = 0;
    CURRENT2.innerHTML = 0;
    player1Turn = true;
    currentScore = 0;
    player1Score = 0;
    player2Score = 0;
    WRAPPER1.classList.remove('winner');
    WRAPPER2.classList.remove('winner');
    WRAPPER1.classList.add('active');
    WRAPPER2.classList.remove('active');
    targetScore = parseInt(prompt("Goal Score:"));
    while(isNaN(targetScore) || targetScore >= 101 || targetScore <= 1){
        if(targetScore >=101 || targetScore <= 1){
            targetScore = parseInt(prompt("Goal must be from 2-100!"));
        }
        else{
            targetScore = parseInt(prompt("Enter a number!"));
        }
        
    }
    GOAL.innerHTML = targetScore;
}

// roll dice
function roll(){
    if(targetScore === null){
        start();
    }
    let r = Math.ceil(Math.random()*6);
    let source = "dice-" + r + ".png";
    currentScore = currentScore + r;
    DICE.src = source;
    if(player1Turn){
        CURRENT1.innerHTML = currentScore;
    }
    else{
        CURRENT2.innerHTML = currentScore;
    }
    if (r === 1){
        currentScore = 0;
        CURRENT2.innerHTML = 0;
        CURRENT1.innerHTML = 0;
        if(player1Turn){
            player1Turn = false;
            WRAPPER1.classList.remove('active');
            WRAPPER2.classList.add('active');
        }
        else{
            player1Turn = true;
            WRAPPER2.classList.remove('active');
            WRAPPER1.classList.add('active');
        }
    }
}

// hold current score
function hold(){
    if(targetScore === null){
        start();
    }
    if(player1Turn){
        player1Score = player1Score + currentScore;
        WRAPPER1.classList.remove('active');
        WRAPPER2.classList.add('active');
        player1Turn = false;
        SCORE1.innerHTML = player1Score;
        player1Score = parseInt(player1Score);
        if(player1Score >= targetScore){
            WRAPPER1.classList.add('winner');
            alert("Player 1 Wins!");
            start();
        }
    }
    else{
        player2Score = player2Score + currentScore;
        WRAPPER2.classList.remove('active');
        WRAPPER1.classList.add('active');
        player1Turn = true;
        SCORE2.innerHTML = player2Score;
        player2Score = parseInt(player2Score);
        if(player2Score >= targetScore){
            WRAPPER2.classList.add('winner');
            alert("Player 2 Wins!");
            start();
        }
    }
    currentScore = 0;
    CURRENT1.innerHTML = 0;
    CURRENT2.innerHTML = 0;


}


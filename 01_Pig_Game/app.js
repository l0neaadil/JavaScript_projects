var scores, roundScore, activePlayer, gamePlaying, dice;

init();

document.querySelector(".btn-roll").addEventListener('click', function(){      /* Anonymous Function */
    if (gamePlaying){
        var preDice = dice;
        dice = Math.floor(Math.random()*6) + 1;
        document.querySelector(".dice").style.display = 'block';
        document.querySelector(".dice").src = "images/dice-" + dice + ".png";

        if (dice !== 1) {
            if (dice === 6 && preDice === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            nextPlayer();
        }
    }
});  

document.querySelector(".btn-hold").addEventListener('click', function(){
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input){
            winningScore = input;
        } else{
            winningScore = 100;
        }
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        } else {
        nextPlayer();
        document.querySelector(".dice").style.display = 'none';
        }
    }
});
    
document.querySelector('.btn-new').addEventListener('click', init);          /* Call back function */


function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = 'none';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};

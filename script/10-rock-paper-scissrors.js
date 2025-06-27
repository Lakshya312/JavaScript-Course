const score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0
};

updateScoreElement();

//Method -->1
/*if(score === null){
  score = {
    wins:0,
    losses:0,
    ties:0
  }
}*/
//Method-->2
/*if(score === null){
  score = {
    wins:0,
    losses:0,
    ties:0
  }
}*/

function playGame(playerMove){
    const computerMove = pickComputerMove();

    let result;

    if(playerMove === 'Scissors'){
        if (computerMove === 'Scissors'){
      result = 'Tie'
      }
    else if (computerMove === 'Rock'){
      result = 'You Lose'
      }
    else if (computerMove === 'Paper'){
      result = 'You Won' 
      }
    }

    else if(playerMove === 'Paper') {
        if (computerMove === 'Paper'){
    result = 'Tie'
    }
  else if (computerMove === 'Scissors'){
    result = 'You Lose'
    }
  else if (computerMove === 'Rock'){
    result = 'You Won'
    }
    }
    
    else if (playerMove === 'Rock'){
        if (computerMove === 'Rock'){
      result = 'Tie'
    }
    else if (computerMove === 'Paper'){
      result = 'You Lose'
    }
    else if (computerMove === 'Scissors'){
      result = 'You Won'
    }
    }

    if(result === 'You Won'){
      score.wins ++ ;
    } else if(result === 'You Lose'){
      score.losses++ ;
    }else if(result === 'Tie'){
      score.ties++;
    }

    localStorage.setItem('score',JSON.stringify(score));

    document.querySelector('.js-result').
  innerHTML = `${result}.`;
document.querySelector('.js-moves').
  innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

    updateScoreElement();
  }

function updateScoreElement(){
  document.querySelector('.js-score').
  innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  
}


function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';
  if(randomNumber >= 0 && randomNumber <1/3){
  computerMove = 'Rock';
  } else if (randomNumber >=1/3 && randomNumber <= 2/3){
  computerMove = 'Paper';
  }else if(randomNumber >= 2/3 && randomNumber < 1){
  computerMove = 'Scissors';
  }
  return computerMove;//The code ended here successfully 
  console.log('hello')// This code will not run.
  }
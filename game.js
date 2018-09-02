const PLAY = '';
const WON = 'You won!';
const LOST = 'You lost!';

class Game {
  constructor(word,noOfChances){
    this._word = word.toUpperCase();
    this._keysPressed = [];
    this._player = new Player(noOfChances);
    this._board = new Array(this._word.length).fill("-");
    this._playerStatus = PLAY;
  };

  get board(){
    return this._board;
  }

  get playerStatus(){
    return this._playerStatus;
  }

  alreadyPressed(key){
    return this._keysPressed.includes(key);
  }

  update(key){
    this._keysPressed.push(key);
    let isCorrect = this._word.includes(key);
    let hasLost = this._player.updateStatus(isCorrect,key);
    this.updateBoard(key);
    this.updateStatus();
  };

  updateBoard(key){
    let indices = getIndicesOf(key,this._word);
    let gameBoard = updateDashList(indices,this._board,key);
    this._board = gameBoard;
  }

  updateStatus(){
    if (this._player.noOfChances == 0){
      this._playerStatus = LOST;
    }
    let hasPlayerWon = this._word.
      replace(/\s/g,'').
      split('').
      every((char)=>this._keysPressed.includes(char))
    if (hasPlayerWon){
      this._playerStatus = WON;
    }
  }

  playerChances(){
    return this._player.noOfChances;
  }
}

class Player {
  constructor(noOfChances){
    this._wrongKeysPressed = [];
    this._noOfChances = noOfChances;
  };

  get noOfChances(){
    return this._noOfChances;
  }

  updateStatus(isCorrect,key){
    if (!isCorrect){
      this._noOfChances--;
      this._wrongKeysPressed.push(key);
      return this._noOfChances == 0;
    }
    return false;
  }
}

const getRandomWord = function() {
  let index = Math.floor(Math.random()*countries.length);
  return countries[index];
};

const getIndicesOf = function(char,word){
  let letters = word.split("");
  return letters.reduce(function(indices,letter,index){
    if(letter==char){
      indices.push(index);
    }
    return indices;
  },[]);
}

const updateDashList = function(indices,dashList,letter){
  for (let index = 0; index < indices.length; index++) {
    dashList[indices[index]] = letter;
  }
  return dashList;
};

const updateGame = function(event,game){
  let key = event.target.id;
  if(!game.alreadyPressed(key)){
    game.update(key);
  }
};

////////////////////////////////////

const updateDisplay = function(game){
  let dashes = document.getElementById("dashes");
  let chances = document.getElementById("chances");
  let playerStatus = document.getElementById("status");
  dashes.innerText = game.board.join("");
  chances.innerText = game.playerChances();
  playerStatus.innerText = game.playerStatus;
  if (playerStatus.innerText != PLAY){
    keyboard.onclick = null;
  }
};

const startGame = function(game){
  updateDisplay(game);
  let keyboard = document.getElementById("keyboard");
  keyboard.onclick = (event)=>{
    updateGame(event,game);
    updateDisplay(game);
  }
};


const loadGame = function(){
  let startButton = document.getElementById("start-button");
  let word = getRandomWord();
  let game = new Game(word,6);
  startButton.onclick = () => {loadGame()}
  startGame(game)
};

window.onload = loadGame;

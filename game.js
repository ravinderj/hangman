const list = [
  "france","italy","india","singapore","australia","poland","iran","iraq","afghanistan","myanmar","brazil","chile","mongolia"
];


class Game {
  constructor(word,noOfChances){
    this._word = word.toUpperCase();
    this._keysPressed = [];
    this._player = new Player(noOfChances);
    this._status = new Array(this._word.length).fill("-");
  };

  get status(){
    return this._status;
  }

  alreadyPressed(key){
    return this._keysPressed.includes(key);
  }

  update(key){
    this._keysPressed.push(key);

    let isCorrect = this._word.includes(key);
    this._player.updateStatus(isCorrect,key);

    this.updateStatus(key);
  };

  updateStatus(key){
    let indices = getIndicesOfSameLetter(this._word,key);
    let gameStatus = updateDashList(indices,this._status,key);
    this._status = gameStatus;
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
    }
  }
}

const getRandomWord = function() {
  let index = Math.floor(Math.random()*list.length);
  return list[index];
};

const getIndicesOfSameLetter = function(word,key){
  let letters = word.split("");
  return letters.reduce(function(indices,letter,index){
    if(letter==key){
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
  console.log(key);
  if(!game.alreadyPressed(key)){
    game.update(key);
  }
};

////////////////////////////////////

const updateDisplay = function(game){
  let dashes = document.getElementById("dashes");
  let chances = document.getElementById("chances");
  dashes.innerText = game.status.join("");
  chances.innerText = game.playerChances();
};

const startGame = function(game){
  updateDisplay(game);
  let keyboard = document.getElementById("keyboard");
  keyboard.onclick = (event)=>{
    let status = updateGame(event,game);
    console.log(game);
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

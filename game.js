const list = [
  "france","italy","india","singapore","australia","poland","iran","iraq","afghanistan","myanmar","brazil","chile","mongolia"
];

const Game = function(word,noOfChances){
  this.word = word.toUpperCase();
  this.keysPressed = [];
  this.player = new Player(noOfChances);
  this.status = new Array(this.word.length).fill("-");
};

Game.prototype.updateStatus = function(key){
  if(!this.word.includes(key)){
    this.player.wrongLetters.push(key);
    this.player.noOfChances--;
  }else{
  let indices = getIndicesOfSameLetter(this.word,key);
  let gameStatus = updateDashList(indices,this.status,key);
  this.status = gameStatus;
  }
};

const Player = function(noOfChances){
  this.wrongLetters = [];
  this.noOfChances = noOfChances;
};

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
  for (var index = 0; index < dashList.length; index++) {
    if(indices.includes(index)){
      dashList[index]=letter;
    }
  }
  return dashList;
};

const updateGame = function(event,game){
  let key = event.target.id;
  console.log(key);
  if(!game.keysPressed.includes(key)){
    game.updateStatus(key);
  }
  game.keysPressed.push(key);
};

////////////////////////////////////

const updateDisplay = function(game){
  let dashes = document.getElementById("dashes");
  let chances = document.getElementById("chances");
  dashes.innerText = game.status.join("");
  chances.innerText = game.player.noOfChances;
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
  startButton.onclick = ()=>{startGame(game)};
};

window.onload = loadGame;

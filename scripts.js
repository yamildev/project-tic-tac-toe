/*
You’re going to store the gameboard as an array inside
 of a Gameboard object, so start there! Your players
  are also going to be stored in objects, and you’re
   probably going to want
 an object to control the flow of the game itself.
*/

const columns = 3;
const rows = 3;

const Gameboard = {
  gameBoard: [],
}

const Players = {
  player1: null,
  player2: null,
}

const gameFlow = {
  
}


for (let i = 0; i < rows; i++) {
  gameboard.push([]);
  for (let j = 0; j < columns; j++) {
    gameboard[i].push([])
  }
}

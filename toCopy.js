let board = [
  [' ', ' ', ' '],
  ['O', 'O', 'X'],
  ['X', 'X', 'X']
];
function initializeEmptyColumns(boardSize) {
  const columns = [];
  for (let i = 0; i < boardSize.columns; i++) {
    columns.push([]);
  }
  return columns;
}


function chooseWinner () {
  
  let winner = null; 

  for (let i = 0; i < board.length; i++) {
    if (board[i].every((element) => (element === 'O'))) {
      winner = 'player O - WIN';
      break;
    } else if (board[i].every((element) => (element === 'X'))) {
      winner = 'player X - WIN';
      break;
    }
  }
  return winner;
}

const chooseWinner = () => {
  let winner = null; 
  for (let i = 0; i < board.length; i++) {
    if (board[i].every((element) => (element === 'O'))) {
      winner = 'player O - WIN';
      break;
    } else if (board[i].every((element) => (element === 'X'))) {
      winner = 'player X - WIN';
      break;
    }
  }
  return winner;
}



/*
** The Gameboard represents the state of the board
** Each equare holds a Cell (defined later)
** and we expose a dropmark method to be able to add Cells to squares
*/
function Gameboard() {
  
    const board = [];
    const boardSize = getBoardSize(3,3);

    function getBoardSize(rows, columns) {
      return {rows, columns}
    };

    (function generateBoard() {
        for (let i = 0; i < boardSize.rows; i++) {
          board[i] = [];
          for (let j = 0; j < boardSize.columns; j++) {
            board[i].push(Cell());
          }
        }  
      }());
    // This will be the method of getting the entire board that our
    // UI will eventually need to render it
    const getBoard = () => board;
    
    const dropMark = (row, column, player) => {
        // Our board's outermost array represents the row,
        
        const cellIsAvailable = board[row][column].getValue() === ' ';
    
        // If cell is not available the move is invalid. Stop execution.
        if (!cellIsAvailable) return console.log('isnt available');
    
        // Otherwise, I have a valid cell
        board[row][column].addMark(player);
      };

      const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
      };

    return {getBoard, dropMark, printBoard, board, boardSize};
}
// ojo con apuntar a Cell en vez de al valor, siempre utilizar el metodo getValue para acceder a los valores.
function Cell() {
    let value = ' ';
   
    // Accept a player's mark to change the value of the cell
    const addMark = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addMark,
      getValue,
    };
}
/*
GameController se ocupa del flujo del juego, asi como de
determinar las condiciones de victoria y si estas se cumplen.
                      
                    A tener en cuenta:
        
Las condiciones para ganar una partida (o no), se checkean en
determineWinner() a excepcion del empate, donde se evalua en 
playRound() al basarse en la cantidad de partidas jugadas, donde
si matchCounter === board.rows * board.columns (cantidad de juegos
igual a la cantidad de celdas ocupadas en teoria), se determina
automaticamente el empate. Porque si al momento winner === null y la
condicion se cumpliera, es empate. 

*/
function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  const boardSize = Gameboard().boardSize;
  
  let winner = null;
  let matchCounter = 0;
  const players = [ // 
    {
      name: playerOneName,
      mark: 'O',
      win() {return `${this.name} win`},  
    },
    {
      name: playerTwoName,
      mark: 'X',
      win() {return `${this.name} win`},
    }
  ];
  //active player by default
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    //lleva la cuenta de cuantas partidas se van jugadno en una ronda
    matchCounter++
    // Drop a mark for the current player
    console.log(
      `Dropping ${getActivePlayer().name}'s mark into position ${row},${column}...`
    );
    board.dropMark(row, column, getActivePlayer().mark);

    /*  This is where we would check for a winner and handle that logic,
        such as a win message */

    // Switch player turn
    
    switchPlayerTurn();
    
    console.log(matchCounter)
    
    const getWinner = determineWinner(board.getBoard());
    const matchLimit = boardSize.rows*boardSize.columns;
    // debug: console.log('gameLimit: ', matchLimit);
    if (matchCounter === matchLimit) {
      console.log('is a Tie:\nPlease reload the page to play again.')
    } else {
      declareWinner(getWinner);
    }
}

  // win conditions, choose winner
  const determineWinner = (board) => {
    let winner = null;
    //if board cells are full and winner === null then winner === is a tie; then return winner
    const checkRows = () => { 
      const checkWinCondition = () => {
        for (let i = 0; i < boardSize.rows; i++) {
          // Verificar si todos los elementos de la fila actual son 'O' 
          if (board[i].every((cell) => cell.getValue() === players[0].mark)) {
            winner =  players[0].win();
            break;
          // Verificar si todos los elementos de la fila actual son 'X' 
          } else if (board[i].every((cell) => cell.getValue() === players[1].mark)) {
            winner = player[1].win();
            break;
          }  
      }
      return winner
    }
    checkWinCondition()
  }  
      /*Genera la cantidad de arrays necesarios para luego pushearles en cada uno los elementos
      de la columna recorrida para su posterior verficiacion de condicion de victoria */
      const checkColumns = () => {      
        const createEmptyColumnsArray = () => {
          const columns = [];
          for (let i = 0; i < boardSize.columns; i++) {
            columns.push([]);  
          }
          return columns;
        }
        const transposeBoardToColumns = (columns) => {
          for (let i = 0; i < boardSize.rows; i++) {
            //Se pushea cada uno de los elementos a una matriz columna
            for (let j = 0; j < boardSize.columns; j++) {
              columns[i].push(board[j][i].getValue());
            }
          }    
        }
        const checkWinCondition = (columns) => { 
          for (let i = 0; i < columns.length; i++) {
            // Verificar si todos los elementos de la fila actual son 'O' 
            if (columns[i].every((cell) => cell === players[0].mark)) {
              winner =  players[0].win();
              break;
            // Verificar si todos los elementos de la fila actual son 'X' 
            } else if (columns[i].every((cell) => cell === players[1].mark)) {
              winner = player[1].win();
              break;
            }
          }
          return winner;
        }
        const columns = createEmptyColumnsArray();
        transposeBoardToColumns(columns);
        checkWinCondition(columns);
      }
      
      const checkDiagonal = () => {
        const getDiagonalValues = () => {
          const diagonalArr = [];
          for (let i = 0; i < boardSize.rows; i++) {
            const j = i;
            diagonalArr.push(board[i][j].getValue())
          }  
          return diagonalArr
        }
        const checkWinCondition = (diagonalArr) => {
          if (diagonalArr.every((cell) => cell === players [0].mark)) {
            winner = players[0].win();
          } else if (diagonalArr.every((cell) => cell === players[1].mark)) {
            winner = players[1].win();
          }
        }
        const diagonalValues = getDiagonalValues();
        checkWinCondition(diagonalValues);   
      }
      
      //check inverse diagonal
      const checkInverseDiagonal = () => {
        const getInverseDiagonalValues = () => {
          const inverseDiagonals = [];
          for (let i = boardSize.rows - 1, j = 0; i >= 0; i--, j++) { // Corregimos el bucle para recorrer la diagonal inversa correctamente
            inverseDiagonals.push(board[i][j].getValue());
          }
          return inverseDiagonals
        }
        const checkWinCondition = () => {
          if (diagonalCells.every((cell) => cell === players[0].mark)) {
            winner = players[0].win();
          } else if (diagonalCells.every((cell) => cell === players[1].mark)) {
            winner = players[1].win();
          };
        };
          const diagonalCells = getInverseDiagonalValues();
          console.log('diagonals arr:', diagonalCells)
          checkWinCondition();  
      }
      /*
      isTie() debido a que el matchCounter++ solo se actualiza en
      playRound(), la funcion se ejecuta alli.
      */
      
    checkRows();
    checkColumns();
    checkDiagonal();
    checkInverseDiagonal();
    return winner;
  }

  const declareWinner = (winner) => {
    if (winner) {
      console.log(winner);
      board.printBoard();
    } else {
      printNewRound()
    }
  }

  // victory (stores who won) is stored in result, then result is used as an argument to declareWInner
 // const getResult = victory(board.getBoard())
  
  
  // Initial play game message
  printNewRound();

  // For the console version, we will only use playRound, but we will need
  // getActivePlayer for the UI version, so I'm revealing it now
  return {
    playRound,
    getActivePlayer,
  };
}


const game = GameController();
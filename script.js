function GameBoard() {
  const grid = 3;
  let board = [];
  for (let i = 0; i < grid; i++) {
    board.push(["#", "#", "#"]);
  }

  const getBoard = () => board;

  function resetBoard() {
    board = [];
    for (let i = 0; i < grid; i++) {
      board.push(["#", "#", "#"]);
    }
  }


  return { getBoard, resetBoard };
}

function GameStatus(gameBoard) {
  function checkForWinner() {
    const board = gameBoard.getBoard();


    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== "#" &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        return board[i][0];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== "#" &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }

    if (
      board[0][0] !== "#" &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] !== "#" &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      return board[0][2];
    }

    return false;
  }

  function matchStatus() {
    const checkWin = checkForWinner();
    const board = gameBoard.getBoard();

    let draw = true;

    if (checkWin) {
      if (checkWin === "X") {
        console.log("Player 1 Wins");
        return gameBoard.resetBoard();
      } else if (checkWin === "O") {
        console.log("Player 2 Wins!");
        return gameBoard.resetBoard();
      }
    } else {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "#") {
            draw = false;
          }
        }
      }

      if (draw) {
        console.log("It's a draw");
        return gameBoard.resetBoard();
      }
    }
    return  "Game in progress.";
  }
  return { matchStatus, checkForWinner };
}

function GameController() {
  const gameBoard = GameBoard();
  const gameStatus = GameStatus(gameBoard);
  let currentPlayerIndex = 0;

  function activePlayer() {
    const p1 = "Player One";
    const p2 = "Player Two";

    const players = [
      { name: p1, symbol: "X" },
      { name: p2, symbol: "O" },
    ];

    const getActivePlayer = () => players[currentPlayerIndex];

    return { getActivePlayer };
  }

  function switchPlayerTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
  }

  function playRound(row, column) {
    const player = activePlayer().getActivePlayer();
    const board = gameBoard.getBoard();

    if (board[row][column] === "#") {
      board[row][column] = player.symbol;
      switchPlayerTurn();
    }

    else {
      return console.error("You canno't play this move. Cell is taken.");
    }


    console.log(
      `${player.name} marked an ${player.symbol} on Row ${row} - Column ${column}`
    );
    console.log(board);
    const winner = gameStatus.checkForWinner();
    const matchStatusResult = gameStatus.matchStatus();
  
    // Log or use the return values appropriately
    console.log("Winner:", winner);
    console.log("Match Status:", matchStatusResult);
  }

  return { playRound };
}

const runTicTacToe = GameController();
runTicTacToe.playRound(0, 1);
runTicTacToe.playRound(2, 0);

runTicTacToe.playRound(0, 2);
runTicTacToe.playRound(2, 2);

runTicTacToe.playRound(0,0);
runTicTacToe.playRound(0,1);

// runTicTacToe.playRound(0, 2);
// runTicTacToe.playRound(2, 0);


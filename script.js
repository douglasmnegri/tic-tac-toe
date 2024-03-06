function GameBoard() {
  const grid = 3;
  let board = [];
  for (let i = 0; i < grid; i++) {
    board.push(["#", "#", "#"]);
  }

  const getBoard = () => board;

  return { getBoard };
}

function gameController() {
  const gameBoard = GameBoard();
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
    console.log(
      `${player.name} marked an ${player.symbol} on Row ${row} - Column ${column}`
    );
    console.log(board);
  }

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

  function gameStatus() {
    const checkWin = checkForWinner();
    const board = gameBoard.getBoard();
    let draw = true;

    if (checkWin) {
      if (checkWin === "X") {
        console.log("Player 1 Wins");
      } else if (checkWin === "O") {
        console.log("Player 2 Wins!");
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
        console.log("It's a draw")
      }

    }
  }

  return { playRound, checkForWinner, gameStatus };
}

const gamePlay = gameController();
gamePlay.playRound(0, 0);
gamePlay.playRound(0, 1);
gamePlay.playRound(0, 2);

// gamePlay.playRound(1, 1);
// gamePlay.playRound(1, 0);
// gamePlay.playRound(1, 2);

// gamePlay.playRound(2, 1);
// gamePlay.playRound(2, 0);
// gamePlay.playRound(2, 2);

gamePlay.checkForWinner();
gamePlay.gameStatus();

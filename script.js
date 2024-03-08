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

    function clearDOM() {
      const squares = document.querySelectorAll(".container div");
      squares.forEach((square) => {
        square.textContent = "";
      });
    }
    let draw = true;

    if (checkWin) {
      if (checkWin === "X") {
        alert("Player 1 Wins");
        clearDOM();
         gameBoard.resetBoard();
         console.log(board)
      } else if (checkWin === "O") {
        alert("Player 2 Wins!");
        clearDOM();
         gameBoard.resetBoard();
         console.log(board)
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
        alert("It's a draw");
        clearDOM();
        gameBoard.resetBoard();
      }
    }
    return "Game in progress.";
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
    } else {
      return console.error("You canno't play this move. Cell is taken.");
    }

    const winner = gameStatus.checkForWinner();
    const matchStatusResult = gameStatus.matchStatus();

    console.log("Winner:", winner);
    console.log("Match Status:", matchStatusResult);
  }

  return { playRound, activePlayer, switchPlayerTurn };
}

function DOM() {
  const squares = document.querySelectorAll(".square");
  const gameController = GameController();

  squares.forEach((square, index) => {
    square.addEventListener("click", () => {
      const player = gameController.activePlayer().getActivePlayer();
      const row = Math.floor(index / 3);
      const col = index % 3;
      square.textContent = player.symbol;
      gameController.playRound(row, col);
    });
  });
}

DOM();

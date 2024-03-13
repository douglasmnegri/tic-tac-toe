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
  let countOne = 0;
  let countTwo = 0;

  function clearDOM() {
    const squares = document.querySelectorAll(".container div");
    squares.forEach((square) => {
      square.textContent = "";
    });
  }

  function restartBoard() {
    const resetButton = document.querySelector(".restart");
    resetButton.addEventListener("click", () => {
      gameBoard.resetBoard();
      clearDOM();
    });
  }

  restartBoard();

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
        alert("This round goes for X");
        clearDOM();
        gameBoard.resetBoard();
      } else if (checkWin === "O") {
        alert("This round goes for O");
        clearDOM();
        gameBoard.resetBoard();
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
    const playerOne = document.querySelector("#scoreX");
    const playerTwo = document.querySelector("#scoreO");

    function countScore() {
      if (checkWin) {
        checkWin === "X" ? countOne++ : countTwo++;
      }

      playerOne.textContent = countOne;
      playerTwo.textContent = countTwo;
    }

    countScore(checkWin);

    function matchWinner() {
      if (countOne === 3) {
        countOne = 0;
        countTwo = 0;
        playerOne.textContent = countOne;
        playerTwo.textContent = countTwo;
        alert("Player 1 Wins the match!");
      } else if (countTwo === 3) {
        countOne = 0;
        countTwo = 0;
        playerOne.textContent = countOne;
        playerTwo.textContent = countTwo;
        alert("Player 2 Wins the match!");
      }
    }

    matchWinner();

    return "Game in progress.";
  }

  return { matchStatus, checkForWinner, clearDOM };
}

function GameController() {
  const gameBoard = GameBoard();
  const gameStatus = GameStatus(gameBoard);
  let currentPlayerIndex = 0;

  const symbolBtn = document.querySelectorAll(".symbol");
  symbolBtn.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.textContent === "X") {
        currentPlayerIndex = 0;
        gameBoard.resetBoard();
        gameStatus.clearDOM();
      } else {
        currentPlayerIndex = 1;
        gameBoard.resetBoard();
        gameStatus.clearDOM();
        console.log(element.textContent);
      }
    });
  });

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

    console.log(board);
    const winner = gameStatus.checkForWinner();
    const matchStatusResult = gameStatus.matchStatus();

    console.log("Winner:", winner);
    console.log("Match Status:", matchStatusResult);
  }

  return { playRound, activePlayer, switchPlayerTurn, currentPlayerIndex };
}

function DOM() {
  const squares = document.querySelectorAll(".square");
  const gameController = GameController();

  squares.forEach((square, index) => {
    square.addEventListener("click", () => {
      if (square.textContent === "") {
        const player = gameController.activePlayer().getActivePlayer();
        const row = Math.floor(index / 3);
        const col = index % 3;
        square.textContent = player.symbol;
        gameController.playRound(row, col);
      }
    });
  });
}

DOM();

//CSS Styling
const toggleButtons = document.querySelectorAll(".symbol");
toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const activeButtons = document.querySelectorAll(".symbol.active");

    activeButtons.forEach((activeBtn) => {
      activeBtn.classList.remove("active");
    });

    btn.classList.add("active");
  });
});

function chooseGrid() {
  const squares = document.querySelectorAll(".square");
  const gridButton = document.querySelector(".grid");
  gridButton.addEventListener("click", () => {
    squares.forEach((element, index) => {
      if (element.classList.contains("board1")) {
        element.classList.remove("board1");
        if (index > 2 && index < 6) {
          element.classList.add("hori");
        }
        if(index == 1 || index == 4 || index == 7) {
          element.classList.add("vert");
        }
      } else {
        element.classList.add("board1");
        element.classList.remove("hori");
        element.classList.remove("vert");
      }
    });
  });
}

chooseGrid();

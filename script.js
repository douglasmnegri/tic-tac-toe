function GameBoard() {
    const grid = 3;
    let board = [];
    for (let i = 0; i < grid; i++) {
      board.push(["#", "#", "#"]);
    }
  
    const getBoard = () => board;
    const availableCells = () =>
      board.filter((element) => element.some((sqr) => sqr === "#"));
  
    return { getBoard, availableCells };
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
      
    }
  
    playRound(1, 0);
    playRound(2,0)
  }
  
  gameController();
  
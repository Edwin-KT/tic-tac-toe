function createPlayer(number) {
  let name = "Player " + number;
  let wins = 0;

  const setName = (playerName) => (name = playerName);
  const incrementWins = () => wins++;

  return { name, number, wins, setName, incrementWins };
}

const gameBoard = (function () {
  const rows = 3,
    cols = 3;
  let table = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

  const resetTable = () => table.forEach((row) => row.fill(0));
  const getCell = (row, col) => table[row][col];
  const setCell = (row, col, value) => (table[row][col] = value);

  return { table, resetTable, getCell, setCell };
})();

const displayController = (function () {
  const gameContainer = document.querySelector("#game-container");

  const drawTable = () => {
    gameContainer.innerHTML = "";

    gameBoard.table.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";

        const cellInner = document.createElement("div");
        cellInner.className = "content";
        cellInner.textContent = cell === 0 ? "" : cell === 1 ? "X" : "O";

        cellDiv.appendChild(cellInner);
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;

        cellDiv.addEventListener("click", () => {
          gameController.chooseCell(rowIndex, colIndex);
        });
        gameContainer.appendChild(cellDiv);
      });
    });
  };

  return { drawTable };
})();

const gameController = (function () {
  const Player1 = createPlayer(1);
  const Player2 = createPlayer(2);
  let currentPlayer = Player1;
  let moves = 0;

  const isWinner = (row, col) => {
    const player = gameBoard.getCell(row, col);
    if (player === 0) return false;

    if ([0, 1, 2].every((c) => gameBoard.getCell(row, c) === player))
      return true;

    if ([0, 1, 2].every((r) => gameBoard.getCell(r, col) === player))
      return true;

    if (
      row === col &&
      [0, 1, 2].every((i) => gameBoard.getCell(i, i) === player)
    )
      return true;
    if (
      row + col === 2 &&
      [0, 1, 2].every((i) => gameBoard.getCell(i, 2 - i) === player)
    )
      return true;

    return false;
  };

  const chooseCell = (row, col) => {
    if (gameBoard.getCell(row, col) !== 0) return;

    gameBoard.setCell(row, col, currentPlayer.number);
    displayController.drawTable();

    if (isWinner(row, col)) {
      console.log(`${currentPlayer.name} won!`);
      currentPlayer.incrementWins();
      startGame();
      return;
    }

    incrementMoves();
    if (getMoves() >= 9) {
      console.log("Draw!");
      startGame();
      return;
    }

    switchPlayer();
  };
  const startGame = () => {
    gameBoard.resetTable();
    moves = 0;
    displayController.drawTable();
  };

  const incrementMoves = () => moves++;

  const getMoves = () => moves;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
  };

  const getCurrentPlayer = () => currentPlayer;
  return {
    startGame,
    getMoves,
    incrementMoves,
    switchPlayer,
    getCurrentPlayer,
    chooseCell,
  };
})();

gameController.startGame();

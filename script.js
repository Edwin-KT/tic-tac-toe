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

  const resetTable = () => {
    table.forEach((row) => row.fill(0));
  };

  const isWinner = (row, col) => {
    const player = table[row][col];
    if (player === 0) return false; // Empty cell can't win

    // Check row
    if (
      table[row][0] === player &&
      table[row][1] === player &&
      table[row][2] === player
    ) {
      return true;
    }

    // Check column
    if (
      table[0][col] === player &&
      table[1][col] === player &&
      table[2][col] === player
    ) {
      return true;
    }

    // Check main diagonal (top-left to bottom-right)
    if (row === col) {
      if (
        table[0][0] === player &&
        table[1][1] === player &&
        table[2][2] === player
      ) {
        return true;
      }
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (row + col === 2) {
      if (
        table[0][2] === player &&
        table[1][1] === player &&
        table[2][0] === player
      ) {
        return true;
      }
    }

    return false;
  };

  const displayArray = () => {
    console.log("Current Game Board:");
    table.forEach((row) => console.log(row.join(" | ")));
    console.log("------------------");
  };

  const chooseCell = (row, col, player) => {
    if (table[row][col] !== 0) return;
    table[row][col] = player.number;
    displayArray();
    if (isWinner(row, col)) {
      console.log(`${player.name} won!`);
      player.incrementWins();
      gameController.startGame();
      return;
    } else {
      gameController.switchPlayer();
      displayController.drawTable();
    }
    gameController.incrementMoves();
    if (gameController.getMoves() >= 9) {
      console.log("Draw!");
      gameController.startGame();
    }
  };
  return { table, resetTable, isWinner, chooseCell };
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
          const currentPlayer = gameController.getCurrentPlayer();
          gameBoard.chooseCell(rowIndex, colIndex, currentPlayer);
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
  };
})();

gameController.startGame();

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
  let array = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

  const resetTable = () => {
    array.forEach((row) => row.fill(0));
  };

  const isWinner = (row, col) => {
    const player = array[row][col];
    if (player === 0) return false; // Empty cell can't win

    // Check row
    if (
      array[row][0] === player &&
      array[row][1] === player &&
      array[row][2] === player
    ) {
      return true;
    }

    // Check column
    if (
      array[0][col] === player &&
      array[1][col] === player &&
      array[2][col] === player
    ) {
      return true;
    }

    // Check main diagonal (top-left to bottom-right)
    if (row === col) {
      if (
        array[0][0] === player &&
        array[1][1] === player &&
        array[2][2] === player
      ) {
        return true;
      }
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (row + col === 2) {
      if (
        array[0][2] === player &&
        array[1][1] === player &&
        array[2][0] === player
      ) {
        return true;
      }
    }

    return false;
  };

  const displayArray = () => {
    console.log("Current Game Board:");
    array.forEach((row) => console.log(row.join(" | ")));
    console.log("------------------");
  };

  const chooseCell = (row, col, player) => {
    array[row][col] = player.number;
    displayArray();
    if (isWinner(row, col)) {
      console.log(`${player.name} won!`);
      gameController.startGame();
    }
  };
  return { array, resetTable, isWinner, chooseCell };
})();

const gameController = (function () {
  const Player1 = createPlayer(1);
  const Player2 = createPlayer(2);

  const startGame = () => {
    gameBoard.resetTable();
  };

  const restartGame = () => {};

  return { startGame, restartGame };
})();

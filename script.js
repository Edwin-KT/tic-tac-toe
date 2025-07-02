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
    let rowCounter = 0,
      colCounter = 0,
      diagonalCounter = 0;
    for (let i = 1; i < 3; i++) {
      if (array[row][i] === array[row][i - 1]) rowCounter++;
      if (array[i][col] === array[i - 1][col]) colCounter++;
    }
    if (row === col) {
      if (array[0][0] === array[1][1] && array[1][1] === array[2][2])
        return true;
      if (array[2][0] === array[1][1] && array[0][2] === array[1][1])
        return true;
    }
    return rowCounter === 3 || colCounter === 3 || diagonalCounter === 3;
  };

  return { array, resetTable };
})();

const gameController = (function () {
  const startGame = () => {
    gameBoard.resetTable();
  };

  return { startGame, restartGame };
})();

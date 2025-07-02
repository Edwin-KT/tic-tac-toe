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

  return { array, resetTable };
})();

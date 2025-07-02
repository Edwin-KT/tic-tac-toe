function createPlayer(number) {
  let name = "Player " + number;
  let wins = 0;

  const setName = (playerName) => (name = playerName);
  const incrementWins = () => wins++;

  return { name, number, wins, setName, incrementWins };
}

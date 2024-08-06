function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  let cell = 0;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell);
      cell++;
    }
  }

  console.log(board);
}

Gameboard();

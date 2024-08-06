function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(0);
    }
  }

  const makeMove = (row, column, player) => {
    //Check if move is valid
    if (board[row][column] !== 0) return;

    board[row][column] = player;
  };

  const printBoard = () => console.table(board);

  return { makeMove, printBoard };
}

const game = Gameboard();
game.makeMove(1, 1, 2);
game.printBoard();

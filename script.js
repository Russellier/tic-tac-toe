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

  const getBoard = () => board;

  const makeMove = (row, column, player) => {
    //Check if move is valid
    if (board[row][column] !== 0) return;

    board[row][column] = player;
  };

  const printBoard = () => console.table(board);

  return { getBoard, makeMove, printBoard };
}

function GameController(
  playerOneName = 'Player 1',
  playerTwoName = 'Player 2'
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];
  console.log(activePlayer);
}

GameController();

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
      mark: 1,
    },
    {
      name: playerTwoName,
      mark: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    if (activePlayer === players[0]) activePlayer = players[1];
    else activePlayer = players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    board.makeMove(row, column, getActivePlayer().mark);

    // Check for winner

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound };
}

const game = GameController();

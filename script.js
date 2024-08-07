function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  const createBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(0);
      }
    }
  };

  // for (let i = 0; i < rows; i++) {
  //   board[i] = [];
  //   for (let j = 0; j < columns; j++) {
  //     board[i].push(0);
  //   }
  // }

  // const getBoard = () => board;

  const isMoveValid = (row, column) => {
    return board[row][column] === 0;
  };

  const makeMove = (row, column, player) => {
    board[row][column] = player;
  };

  const printBoard = () => console.table(board);

  createBoard();

  return {
    rows,
    columns,
    board,
    createBoard,
    isMoveValid,
    makeMove,
    printBoard,
  };
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
    // board.createBoard();
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const didPlayerWin = () => {
    // Check rows
    for (let i = 0; i < board.rows; i++) {
      if (
        board.board[i][0] !== 0 &&
        board.board[i][0] === board.board[i][1] &&
        board.board[i][1] === board.board[i][2]
      )
        return true;
    }

    // Check columns
    for (let j = 0; j < board.columns; j++) {
      if (
        board.board[0][j] !== 0 &&
        board.board[0][j] === board.board[1][j] &&
        board.board[1][j] === board.board[2][j]
      )
        return true;
    }

    // Check diagonals
    if (
      (board.board[0][0] !== 0 &&
        board.board[0][0] === board.board[1][1] &&
        board.board[1][1] === board.board[2][2]) ||
      (board.board[0][2] !== 0 &&
        board.board[0][2] === board.board[1][1] &&
        board.board[1][1] === board.board[0][2])
    )
      return true;

    return false;
  };

  // Check for tie
  const isGameOver = () => {
    for (let i = 0; i < board.rows; i++) {
      for (let j = 0; j < board.columns; j++) {
        if (board.board[i][j] === 0) return false;
      }
    }

    return true;
  };

  const playRound = (row, column) => {
    if (board.isMoveValid(row, column)) {
      board.makeMove(row, column, getActivePlayer().mark);

      if (didPlayerWin()) console.log(`${getActivePlayer().name} wins`);

      if (isGameOver()) console.log('Tie');

      if (didPlayerWin() || isGameOver()) {
        console.log('Game Restarted');
        board.createBoard();
      }

      switchPlayerTurn();
      printNewRound();
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.board,
  };
}

function screenController() {
  const game = GameController();
  const activePlayerEl = document.querySelector('.active-player');
  const boardEl = document.querySelector('.board');

  const displayBoard = () => {
    boardEl.textContent = '';

    const board = game.getBoard;
    const activePlayer = game.getActivePlayer();

    activePlayerEl.textContent = `${activePlayer.name}'s turn`;

    board.forEach((row, i) => {
      row.forEach((column, j) => {
        const squareBtn = document.createElement('button');
        squareBtn.classList.add('square-btn');
        squareBtn.textContent = board[i][j];
        squareBtn.dataset.row = i;
        squareBtn.dataset.column = j;
        boardEl.appendChild(squareBtn);
      });
    });
  };

  function clickHandler(e) {
    if (!e.target.classList.contains('square-btn')) return;

    const row = e.target.dataset.row;
    const column = e.target.dataset.column;
    console.log(row);
    console.log(column);

    game.playRound(row, column);
    displayBoard();
  }

  boardEl.addEventListener('click', clickHandler);

  displayBoard();
}

screenController();

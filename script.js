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

  // const printBoard = () => console.table(board);

  createBoard();

  return {
    rows,
    columns,
    board,
    createBoard,
    isMoveValid,
    makeMove,
    // printBoard,
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
      mark: 'X',
      score: 0,
    },
    {
      name: playerTwoName,
      mark: 'O',
      score: 0,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    if (activePlayer === players[0]) activePlayer = players[1];
    else activePlayer = players[0];
  };

  const getPlayers = () => players;
  const getActivePlayer = () => activePlayer;

  // const printNewRound = () => {
  //   // board.createBoard();
  //   // board.printBoard();
  //   // console.log(`${getActivePlayer().name}'s turn.`);
  // };

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
        board.board[1][1] === board.board[2][0])
    )
      return true;

    return false;
  };

  // Check for tie
  const isTie = () => {
    for (let i = 0; i < board.rows; i++) {
      for (let j = 0; j < board.columns; j++) {
        if (board.board[i][j] === 0) return false;
      }
    }

    return true;
  };

  const playRound = (row, column) => {
    let isGameOver = false;

    if (board.isMoveValid(row, column)) {
      board.makeMove(row, column, getActivePlayer().mark);

      if (didPlayerWin()) {
        console.log(`${getActivePlayer().name} wins`);
        activePlayer.score++;
        //text = 'active player' wins
      } else if (isTie()) {
        console.log('Tie');
        //text = tie
      }

      if (didPlayerWin() || isTie()) {
        isGameOver = true;
        console.log('Game Restarted');
        board.createBoard();
        //display text
        //create next round button
        //create restart button
      }

      switchPlayerTurn();
      // printNewRound();
    }
    return isGameOver;
  };

  // printNewRound();

  return {
    playRound,
    getActivePlayer,
    getPlayers,
    getBoard: board.board,
  };
}

function ScreenController() {
  // const game = GameController();
  let game;
  const gameContainer = document.querySelector('.game-container');
  const activePlayerEl = document.querySelector('.active-player');
  const boardEl = document.querySelector('.board');
  const dialogBox = document.querySelector('.form-container');
  const form = document.querySelector('.form');
  const startBtn = document.querySelector('.start-btn');
  const player1 = document.querySelector('.player1');
  const player2 = document.querySelector('.player2');

  const displayBoard = () => {
    if (!game) return;

    // Clear display
    boardEl.textContent = '';

    const board = game.getBoard;
    const activePlayer = game.getActivePlayer();

    activePlayerEl.textContent = `${activePlayer.name}'s turn: ${activePlayer.mark}`;

    board.forEach((row, i) => {
      row.forEach((column, j) => {
        const squareBtn = document.createElement('button');
        squareBtn.classList.add('square-btn');
        squareBtn.innerHTML = showMark(board[i][j]);
        squareBtn.dataset.row = i;
        squareBtn.dataset.column = j;
        boardEl.appendChild(squareBtn);
      });
    });
  };

  const displayScore = () => {
    if (!game) return;

    const players = game.getPlayers();
    const scoreContainer = document.querySelector('.score-container');
    const scoreHeading = document.createElement('p');
    const score1 = document.createElement('span');
    const score2 = document.createElement('span');

    // prevent duplication score
    scoreContainer.textContent = '';

    scoreHeading.textContent = 'Score';
    score1.textContent = `${players[0].name}: ${players[0].score}`;
    score2.textContent = `${players[1].name}: ${players[1].score}`;

    scoreContainer.append(scoreHeading, score1, score2);

    console.log(`${players[0].mark} score: ${players[0].score}`);
    console.log(`${players[1].mark} score: ${players[1].score}`);
  };

  const showMark = (playerMark) => {
    let btnImg = '';

    if (playerMark === 'X') btnImg = '<img src="icons/xMark.svg" alt="X" />';
    else if (playerMark === 'O')
      btnImg = '<img src="icons/oMark.svg" alt="O" />';

    return btnImg;
  };

  function clickHandler(e) {
    if (!e.target.classList.contains('square-btn')) return;

    const row = e.target.dataset.row;
    const column = e.target.dataset.column;
    // console.log(row);
    // console.log(column);

    game.playRound(row, column);
    displayScore();
    displayBoard();
  }

  function isInputValid(name1, name2) {
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('error-msg');

    if (form.lastElementChild !== startBtn) {
      form.removeChild(form.lastElementChild);
    }

    if (!name1) {
      errorMsg.textContent = 'Please enter Player 1 name';
      form.appendChild(errorMsg);
      return false;
    }

    if (!name2) {
      errorMsg.textContent = 'Please enter Player 2 name';
      form.appendChild(errorMsg);
      return false;
    }

    if (name1 === name2) {
      errorMsg.textContent = 'Please enter different names';
      form.appendChild(errorMsg);
      return false;
    }

    return true;
  }

  function initialize(e) {
    const name1 = player1.value;
    const name2 = player2.value;

    if (!isInputValid(name1, name2)) {
      e.preventDefault();
      return;
    }

    game = GameController(name1, name2);

    displayBoard();
    displayScore();
  }

  startBtn.addEventListener('click', initialize);

  // Prevent user from closing dialog
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
    }
  });

  boardEl.addEventListener('click', clickHandler);

  dialogBox.showModal();
  // displayBoard();
}

ScreenController();

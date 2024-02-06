const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();
const playerFactory = (name, symbol) => {
  return { name, symbol };
};
const gameController = (() => {
  let player1 = playerFactory(
    "Player 1 ",
    `<img src="https://img.icons8.com/ios/50/000000/x.png" alt="X" class="x">`
  );
  let player2 = playerFactory(
    "Player 2 ",
    `<img src="https://img.icons8.com/ios/50/000000/o.png" alt="O" class="o">`
  );
  let currentPlayer = player1;
  let gameStatus = "active";
  let title = document.querySelector(".title");
  let cells = document.querySelectorAll(".cell");
  let turn = 0;
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  const startGame = () => {
    currentPlayer = player1;
    gameStatus = "active";
    turn = 0;
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.style.backgroundColor = "#f2f2f2";
    });
    title.innerHTML = `${currentPlayer.name}'s turn`;
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (gameBoard.board[index] === "" && gameStatus === "active") {
          gameBoard.board[index] = currentPlayer.symbol;
          cell.innerHTML = currentPlayer.symbol;
          turn++;
          checkWinner();
          if (turn === 9) {
            gameStatus = "tie";
            title.innerHTML = "It's a tie";
          }
          switchPlayer();
          if (gameStatus === "active") {
            title.innerHTML = `${currentPlayer.name}'s turn`;
          }
        }
      });
    });
  };
  const checkWinner = () => {
    let winningComb = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [3, 4, 5],
      [6, 7, 8],
      [6, 4, 2],
      [1, 4, 7],
      [2, 5, 8],
    ];
    winningComb.forEach((comb) => {
      if (
        gameBoard.board[comb[0]] === gameBoard.board[comb[1]] &&
        gameBoard.board[comb[1]] === gameBoard.board[comb[2]] &&
        gameBoard.board[comb[0]] !== ""
      ) {
        gameStatus = "over";
        endGame(comb);
      }
    });
  };
  const endGame = (position) => {
    let pos1 = document.getElementById(`${position[0]}`);
    let pos2 = document.getElementById(`${position[1]}`);
    let pos3 = document.getElementById(`${position[2]}`);
    pos1.style.backgroundColor = "lightgreen";
    pos2.style.backgroundColor = "lightgreen";
    pos3.style.backgroundColor = "lightgreen";
    title.innerHTML = `${currentPlayer.name} wins`;
  };
  return { startGame };
})();
let start = document.querySelector("#start");
let reset = document.querySelector("#reset");
start.addEventListener("click", () => {
  gameController.startGame();
});
reset.addEventListener("click", () => {
  location.reload();
});

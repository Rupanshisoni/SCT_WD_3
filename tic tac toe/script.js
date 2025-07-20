
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById("status");
const boardElement = document.getElementById("gameBoard");

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = index;
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", handleClick);
    boardElement.appendChild(cellDiv);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();
  checkResult();
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (currentPlayer === "O") {
    setTimeout(botMove, 500); // Delay for bot
  }
}

function checkResult() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusDisplay.textContent = `Player ${board[a]} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function botMove() {
  if (!gameActive) return;
  let emptyCells = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  if (emptyCells.length === 0) return;

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "O";
  renderBoard();
  checkResult();
  currentPlayer = "X";
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = "";
  renderBoard();
}

renderBoard();

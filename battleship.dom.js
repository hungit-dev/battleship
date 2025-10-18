import { Ship, Player } from "./battleship.js";

const humanPlayer = Player("human");
const opponentPlayer = Player("computer");
const humanPlayerConsole = humanPlayer.gameBoard;
const opponentPlayerConsole = opponentPlayer.gameBoard;
const humanGameBoard = humanPlayerConsole.getGameBoard();
const opponentGameBoard = opponentPlayerConsole.getGameBoard();
const myGrid = document.querySelector(".my-grid");
const opponentGrid = document.querySelector(".opponent-grid");
const winnerMessage = document.querySelector("#winner-message");
const refreshPageButton = document.querySelector("#refresh-page-button");
let currentLength = 2;
let direction = "row";
let isReady = false;
let foundWinner = false;
// create 10x10 UI grid and Associate each UI grid cell with its corresponding item in the array.
function createUIGrid(gridName, gameBoardName) {
  for (let row = 0; row < gameBoardName.length; row++) {
    for (let col = 0; col < gameBoardName[row].length; col++) {
      const div = document.createElement("div");
      div.classList.add("grid-cell");
      div.dataset.row = row;
      div.dataset.col = col;
      gridName.appendChild(div);
    }
  }
}
createUIGrid(myGrid, humanGameBoard);
createUIGrid(opponentGrid, opponentGameBoard);
function highlightGridCells(rowCoordinate, columnCoordinate, gridName) {
  for (let i = 0; i < currentLength; i++) {
    if (direction === "row") {
      const selectedElement = gridName.querySelector(
        `div[data-row="${rowCoordinate}"][data-col="${columnCoordinate + i}"]`
      );
      selectedElement.classList.add("selecting-grid-cells");
    }
    if (direction === "column") {
      const selectedElement = gridName.querySelector(
        `div[data-row="${rowCoordinate + i}"][data-col="${columnCoordinate}"]`
      );
      selectedElement.classList.add("selecting-grid-cells");
    }
  }
}
function removeCellHighlights(rowCoordinate, columnCoordinate, gridName) {
  for (let i = 0; i < currentLength; i++) {
    if (direction === "row") {
      const selectedElement = gridName.querySelector(
        `div[data-row="${rowCoordinate}"][data-col="${columnCoordinate + i}"]`
      );
      selectedElement.classList.remove("selecting-grid-cells");
    }
    if (direction === "column") {
      const selectedElement = gridName.querySelector(
        `div[data-row="${rowCoordinate + i}"][data-col="${columnCoordinate}"]`
      );
      selectedElement.classList.remove("selecting-grid-cells");
    }
  }
}
function hasHumanPlayerPlacedShips(gameBoardName) {
  for (let row = 0; row < gameBoardName.length; row++) {
    for (let col = 0; col < gameBoardName[row].length; col++) {
      if (gameBoardName[row][col] !== 0) {
        return true;
      }
    }
  }
  return false;
}
function handleGridCellsClickOnHumanPlayerGameBoard(event, gridName) {
  if (isReady === false) {
    const rowCoordinate = Number(event.target.dataset.row);
    const columnCoordinate = Number(event.target.dataset.col);
    const ship = Ship(`ship ${currentLength}`, currentLength);
    if (
      humanPlayerConsole.placeShip(
        ship,
        rowCoordinate,
        columnCoordinate,
        direction
      )
      //select the grid cells only if the game is not started
    ) {
      //select the correct UI grid cells based on the correct coordinates
      for (let i = 0; i < currentLength; i++) {
        if (direction === "row") {
          const selectedElement = gridName.querySelector(
            `div[data-row="${rowCoordinate}"][data-col="${
              columnCoordinate + i
            }"]`
          );
          selectedElement.style.backgroundColor = "grey";
        }
        if (direction === "column") {
          const selectedElement = gridName.querySelector(
            `div[data-row="${
              rowCoordinate + i
            }"][data-col="${columnCoordinate}"]`
          );
          selectedElement.style.backgroundColor = "grey";
        }
      }
    }
  }

  if (isReady === true) {
    alert("Please click on the Opponent's grid!");
    return;
  }
}
function handleGridCellsClickOnComputerPlayerGameBoard(event) {
  if (isReady === false) {
    alert("please click Start Button to play!");
    return;
  }
  const rowCoordinate = Number(event.target.dataset.row);
  const columnCoordinate = Number(event.target.dataset.col);
  if (event.target.classList.contains("clicked")) {
    return;
  } // don't let user click the same element twice
  if (
    opponentPlayerConsole.receiveAttack(rowCoordinate, columnCoordinate) ===
    "hit"
  ) {
    event.target.style.backgroundColor = "red";

    event.target.classList.add("clicked");
  } else {
    event.target.textContent = "X";

    event.target.classList.add("clicked");
  }
  if (checkForWinner() === "human") {
    winnerMessage.textContent = "Human is the winner!";
  }
  opponentGrid.classList.add("disabled")//disable opponent grid immediately after attacking opponentGrid
  // Let the computer attack the human's game board after 1 second and show the currently active (visible) game board

  setTimeout(letComputerAttack, 1000);
  setTimeout(() => {
    myGrid.classList.add("disabled");
    opponentGrid.classList.remove("disabled");
    lockGridAndButtons();
  }, 2000);
}

function lockGridAndButtons() {
  if (isReady === false) {
    opponentGrid.classList.add("disabled");
    myGrid.classList.remove("disabled");
  }
  if (isReady === true) {
    opponentGrid.classList.remove("disabled");
    myGrid.classList.add("disabled");
    select2LengthButton.disabled = true;
    select3LengthButton.disabled = true;
    select4LengthButton.disabled = true;
    select5LengthButton.disabled = true;
    placeShipHorizontallyButton.disabled = true;
    placeShipVerticallyButton.disabled = true;
  }
  if (foundWinner === true) {
    opponentGrid.classList.add("disabled");
    myGrid.classList.add("disabled");
  }
}
function letComputerAttack() {
  let attack = false;

  myGrid.classList.remove("disabled");
  opponentGrid.classList.add("disabled");

  while (!attack) {
    const rowCoordinate = Math.floor(Math.random() * 10);
    const columnCoordinate = Math.floor(Math.random() * 10);
    const gridCell = myGrid.querySelector(
      `div[data-row="${rowCoordinate}"][data-col="${columnCoordinate}"]`
    );

    if (gridCell.classList.contains("attacked") === false) {
      const receivedAttack = humanPlayerConsole.receiveAttack(
        rowCoordinate,
        columnCoordinate
      );

      if (receivedAttack === "miss") {
        gridCell.textContent = "X";
      }
      if (receivedAttack === "hit") {
        gridCell.style.backgroundColor = "red";
      }
      gridCell.classList.add("attacked");
      attack = true;
    }
  }
  if (checkForWinner() === "computer") {
    winnerMessage.textContent = "Computer is the Winner!";
  }
}

function letComputerPlaceShips() {
  for (let i = 2; i <= 5; i++) {
    let placed = false;
    while (!placed) {
      const randomNumber = Math.floor(Math.random() * 2);
      let rowCoordinate;
      let columnCoordinate;
      if (randomNumber === 0) {
        direction = "row";
        rowCoordinate = Math.floor(Math.random() * 10);
        columnCoordinate = Math.floor(Math.random() * (10 - i + 1));
      }
      if (randomNumber === 1) {
        direction = "column";
        rowCoordinate = Math.floor(Math.random() * (10 - i + 1));
        columnCoordinate = Math.floor(Math.random() * 10);
      }

      const ship = Ship(`Ship ${i}`, i);

      const success = opponentPlayerConsole.placeShip(
        ship,
        rowCoordinate,
        columnCoordinate,
        direction
      );
      if (success) {
        //keeps place ships on random coordinate until all of the ships have been placed
        placed = true;
      }
    }
  }
}
function checkForWinner() {
  if (humanPlayerConsole.areAllShipsSunk() === true) {
    foundWinner = true;
    lockGridAndButtons();
    return "computer";
  }
  if (opponentPlayerConsole.areAllShipsSunk() === true) {
    foundWinner = true;
    lockGridAndButtons();
    return "human";
  }
}

//buttons for changing ship's size
const select5LengthButton = document.querySelector("#ship-length-5-button");
const select4LengthButton = document.querySelector("#ship-length-4-button");
const select3LengthButton = document.querySelector("#ship-length-3-button");
const select2LengthButton = document.querySelector("#ship-length-2-button");
select5LengthButton.addEventListener("click", () => {
  currentLength = 5;
});
select4LengthButton.addEventListener("click", () => {
  currentLength = 4;
});
select3LengthButton.addEventListener("click", () => {
  currentLength = 3;
});
select2LengthButton.addEventListener("click", () => {
  currentLength = 2;
});

const placeShipHorizontallyButton = document.querySelector(
  "#place-ship-horizontally-button"
);
const placeShipVerticallyButton = document.querySelector(
  "#place-ship-vertically-button"
);
//buttons for changing ship's direction
placeShipHorizontallyButton.addEventListener("click", () => {
  direction = "row";
});
placeShipVerticallyButton.addEventListener("click", () => {
  direction = "column";
});
//lock the opponent grid by default if users have not clicked start button
window.addEventListener("load", () => {
  lockGridAndButtons();
});
// hovering one cell highlights the full area the ship would take up from that spot and remove highlight if users do not hover anymore
myGrid.addEventListener("mouseover", (event) => {
  const rowCoordinate = Number(event.target.dataset.row);
  const columnCoordinate = Number(event.target.dataset.col);
  highlightGridCells(rowCoordinate, columnCoordinate, myGrid);
});
myGrid.addEventListener("mouseout", (event) => {
  const rowCoordinate = Number(event.target.dataset.row);
  const columnCoordinate = Number(event.target.dataset.col);
  removeCellHighlights(rowCoordinate, columnCoordinate, myGrid);
});

opponentGrid.addEventListener("mouseover", (event) => {
  const rowCoordinate = Number(event.target.dataset.row);
  const columnCoordinate = Number(event.target.dataset.col);
  highlightGridCells(rowCoordinate, columnCoordinate, opponentGrid);
});
opponentGrid.addEventListener("mouseout", (event) => {
  const rowCoordinate = Number(event.target.dataset.row);
  const columnCoordinate = Number(event.target.dataset.col);
  removeCellHighlights(rowCoordinate, columnCoordinate, opponentGrid);
});
//let users interact with the UI grid and run logic based on what users interact if the game has not started
myGrid.addEventListener("click", (event) => {
  handleGridCellsClickOnHumanPlayerGameBoard(event, myGrid);
});

// if users click, computer will place their ship and users cannot interact with their grid anymore, they are just able to interact with the opponent's grid
const startGameButton = document.querySelector("#start-button");
startGameButton.addEventListener("click", () => {
  if (hasHumanPlayerPlacedShips(humanGameBoard) === false) {
    alert("Please place your ships before clicking start button!");
    return;
  }
  isReady = true;
  currentLength = 1; //let users select only 1 cell in 1 turn
  startGameButton.disabled = true;
  lockGridAndButtons();
  letComputerPlaceShips();
});
opponentGrid.addEventListener("click", (event) => {
  handleGridCellsClickOnComputerPlayerGameBoard(event);
});
refreshPageButton.addEventListener("click", () => {
  window.location.reload();
});

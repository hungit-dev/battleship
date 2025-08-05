import {
  highlightGridCells,
  removeCellHighlights,
  hasHumanPlayerPlacedShips,
  handleGridCellsClickOnComputerPlayerGameBoard,
  handleGridCellsClickOnHumanPlayerGameBoard,
  lockGridAndButtons,
  letComputerPlaceShips,
} from "./battleship.dom";
const humanPlayer = Player("human");
const opponentPlayer = Player("computer");
const humanPlayerConsole = humanPlayer.gameBoard;
const opponentPlayerConsole = opponentPlayer.gameBoard;
const humanGameBoard = humanPlayerConsole.getGameBoard();
const opponentGameBoard = opponentPlayerConsole.getGameBoard();
const myGrid = document.querySelector(".my-grid");
const opponentGrid = document.querySelector(".opponent-grid");
const winnerMessage = document.querySelector("#winner-message");
let currentLength = 2;
let direction = "row";
let isReady = false;
let foundWinner = false;

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

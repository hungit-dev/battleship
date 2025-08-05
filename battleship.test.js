import { Ship, GameBoard, Player } from "./battleship.js";
test("take hit", () => {
  const ship1 = Ship("ship1", 1);
  ship1.hit();
  expect(ship1.showHitCount()).toBe(1);
});
test("determine whether a ship is sunk based on its length and the number of hits it has received", () => {
  const ship1 = Ship("ship1", 1);
  ship1.hit();
  const ship2 = Ship("ship2", 1);
  expect(ship1.isSunk()).toBe(true);
  expect(ship2.isSunk()).toBe(false);
});
test("place ship at specific coordinates based on its length", () => {
  const ship1 = Ship("ship1", 2);
  const ship2 = Ship("ship2", 2);
  const gameBoard1 = GameBoard();
  gameBoard1.placeShip(ship1, 0, 1, "row");
  gameBoard1.placeShip(ship2, 1, 1, "column");
  expect(gameBoard1.getGameBoard()[0][1]).toBe(ship1);
  expect(gameBoard1.getGameBoard()[0][2]).toBe(ship1);
  expect(gameBoard1.getGameBoard()[1][1]).toBe(ship2);
  expect(gameBoard1.getGameBoard()[2][1]).toBe(ship2);
});
test("receive attack", () => {
  const ship1 = Ship("ship1", 1);
  const ship2 = Ship("ship2", 1);
  const gameBoard1 = GameBoard();
  gameBoard1.placeShip(ship1, 0, 1, "row");
  gameBoard1.placeShip(ship2, 0, 2, "row");
  gameBoard1.receiveAttack(0, 1);
  expect(ship1.showHitCount()).toBe(1);
  expect(ship2.showHitCount()).toBe(0);
});
test("check if all ships has been sunk", () => {
  const ship1 = Ship("ship1", 2);
  const gameBoard1 = GameBoard();
  gameBoard1.placeShip(ship1, 0, 1, "column");
  const ship2 = Ship("ship2", 1);
  gameBoard1.placeShip(ship2, 1, 2, "column");
  gameBoard1.receiveAttack(0, 1);
  gameBoard1.receiveAttack(1, 1);
  gameBoard1.receiveAttack(1, 2);
  expect(gameBoard1.areAllShipsSunk()).toBe(true);
});
test("check if players have their own game board", () => {
  const player1 = Player("hung");
  const player2 = Player("computer");
  const gameBoardConsoleForPlayer1 = player1.gameBoard;
  const gameBoardForPlayer1 = gameBoardConsoleForPlayer1.getGameBoard();
  const gameBoardConsoleForPlayer2 = player2.gameBoard;
  const gameBoardForPlayer2 = gameBoardConsoleForPlayer2.getGameBoard();
  const ship1 = Ship("ship1", 1);
  const ship2 = Ship("ship2", 2);
  gameBoardConsoleForPlayer1.placeShip(ship1, 0, 0, "row");
  gameBoardConsoleForPlayer2.placeShip(ship2, 1, 1, "column");
  expect(gameBoardForPlayer1[0][0]).toBe(ship1);
  expect(gameBoardForPlayer1[1][1]).toBe(0);
  expect(gameBoardForPlayer2[1][1]).toBe(ship2);
});

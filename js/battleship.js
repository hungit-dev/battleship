function Ship(name, length) {
  let hitCount = 0;
  let sunk = false;
  const showHitCount = () => {
    return hitCount;
  };
  const hit = () => {
    hitCount++;
  };
  const isSunk = () => {
    return (sunk = hitCount >= length ? true : false);
  };
  return { name, length, showHitCount, hit, isSunk };
}
function GameBoard() {
  const shipList = [];
  const showShipList = () => {
    console.log(shipList);
  };
  const areAllShipsSunk = () => {
    for (let i = 0; i < shipList.length; i++) {
      if (shipList[i].isSunk() === false) {
        return false;
      }
    }

    return true;
  };
  const gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const getGameBoard = () => {
    return gameBoard;
  };
  const canPlaceShip = (shipLength, coordinate1, coordinate2, direction) => {
    if (direction === "row") {
      for (let i = 0; i < shipLength; i++) {
        if (gameBoard[coordinate1][coordinate2 + i] !== 0) {
          return false;
        }
      }
      return true;
    }
    if (direction === "column") {
      for (let i = 0; i < shipLength; i++) {
        if (gameBoard[coordinate1 + i][coordinate2] !== 0) {
          return false;
        }
      }
      return true;
    }
  };
  const placeShip = (ship, coordinate1, coordinate2, direction) => {
    if (canPlaceShip(ship.length, coordinate1, coordinate2, direction)) {
      if (direction === "row") {
        for (let i = 0; i < ship.length; i++) {
          gameBoard[coordinate1][coordinate2 + i] = ship;
        }
      }
      if (direction === "column") {
        for (let i = 0; i < ship.length; i++) {
          gameBoard[coordinate1 + i][coordinate2] = ship;
        }
      }
      shipList.push(ship);
      return true;
    }
    return false;
  };
  const receiveAttack = (coordinate1, coordinate2) => {
    if (gameBoard[coordinate1][coordinate2] !== 0) {
      const ship = gameBoard[coordinate1][coordinate2];
      gameBoard[coordinate1][coordinate2] = "hit";
      ship.hit();
      return "hit";
    } else {
      gameBoard[coordinate1][coordinate2] = "miss";
      return "miss";
    }
  };

  return {
    showShipList,
    areAllShipsSunk,
    getGameBoard,
    placeShip,
    receiveAttack,
  };
}
function Player(name) {
  const gameBoard = GameBoard();
  return { name, gameBoard };
}

export { Ship, GameBoard, Player };

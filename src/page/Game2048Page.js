import { useState, useEffect } from "react";

const SIZE = 4;
const INITIAL_TILES = 2;

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const initializeBoard = () => {
  const board = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(null));
  for (let i = 0; i < INITIAL_TILES; i++) {
    addRandomTile(board);
  }
  return board;
};

const addRandomTile = (board) => {
  let added = false;
  while (!added) {
    const row = getRandomInt(SIZE);
    const col = getRandomInt(SIZE);
    if (board[row][col] === null) {
      board[row][col] = getRandomInt(10) < 9 ? 2 : 4;
      added = true;
    }
  }
};

const moveLeft = (board, setScore) => {
  let newBoard = board.map((row) => row.filter((tile) => tile !== null));
  newBoard = newBoard.map((row) => {
    while (row.length < SIZE) {
      row.push(null);
    }
    return row;
  });
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - 1; j++) {
      if (newBoard[i][j] !== null && newBoard[i][j] === newBoard[i][j + 1]) {
        newBoard[i][j] *= 2;
        newBoard[i][j + 1] = null;
        setScore((prevScore) => prevScore + newBoard[i][j]);
      }
    }
    newBoard[i] = newBoard[i].filter((tile) => tile !== null);
    while (newBoard[i].length < SIZE) {
      newBoard[i].push(null);
    }
  }
  return newBoard;
};

const rotateBoard = (board) => {
  let newBoard = board.map((row) => [...row]);
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      newBoard[j][SIZE - i - 1] = board[i][j];
    }
  }
  return newBoard;
};

const move = (board, direction, setScore) => {
  let newBoard = board.map((row) => [...row]);
  for (let i = 0; i < direction; i++) {
    newBoard = rotateBoard(newBoard);
  }
  newBoard = moveLeft(newBoard, setScore);
  for (let i = 0; i < (4 - direction) % 4; i++) {
    newBoard = rotateBoard(newBoard);
  }
  return newBoard;
};

const Tile = ({ value }) => (
  <div
    className={`tile w-16 h-16 flex justify-center items-center bg-gray-200 text-gray-700 font-bold text-lg rounded-lg shadow-md`}
  >
    {value}
  </div>
);

const Game2048 = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e) => {
    if (gameOver) return;
    let newBoard;
    switch (e.key) {
      case "ArrowLeft":
        newBoard = move(board, 0, setScore);
        break;
      case "ArrowUp":
        newBoard = move(board, 3, setScore);
        break;
      case "ArrowRight":
        newBoard = move(board, 2, setScore);
        break;
      case "ArrowDown":
        newBoard = move(board, 1, setScore);
        break;
      default:
        return;
    }
    if (newBoard.toString() !== board.toString()) {
      addRandomTile(newBoard);
    }
    setBoard(newBoard);
    checkGameOver(newBoard);
  };

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    const touchStartY = e.touches[0].clientY;
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    function handleTouchMove(e) {
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          handleKeyDown({ key: "ArrowRight" });
        } else {
          handleKeyDown({ key: "ArrowLeft" });
        }
      } else {
        if (dy > 0) {
          handleKeyDown({ key: "ArrowDown" });
        } else {
          handleKeyDown({ key: "ArrowUp" });
        }
      }
    }
  };

  const checkGameOver = (board) => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (board[i][j] === null) return;
        if (i < SIZE - 1 && board[i][j] === board[i + 1][j]) return;
        if (j < SIZE - 1 && board[i][j] === board[i][j + 1]) return;
      }
    }
    setGameOver(true);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, gameOver, handleKeyDown]);

  return (
    <div
      className="flex flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
    >
      <div className="mb-4 text-3xl font-bold">2048</div>
      <div className="grid grid-cols-4 gap-4">
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={tile} />
          ))
        )}
      </div>
      <div className="mt-4 text-lg font-bold">Score: {score}</div>
      {gameOver && (
        <div className="mt-4 text-xl font-bold text-red-600">Game Over!</div>
      )}
    </div>
  );
};

export default Game2048;

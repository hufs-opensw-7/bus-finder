import { useState, useEffect } from 'react';
import './Game2048Page.css';

const SIZE = 4;
const INITIAL_TILES = 2;

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const initializeBoard = () => {
  const board = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));
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
  let newBoard = board.map(row => row.filter(tile => tile !== null));
  newBoard = newBoard.map(row => {
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
        setScore(prevScore => prevScore + newBoard[i][j]);
      }
    }
    newBoard[i] = newBoard[i].filter(tile => tile !== null);
    while (newBoard[i].length < SIZE) {
      newBoard[i].push(null);
    }
  }
  return newBoard;
};

const rotateBoard = (board) => {
  let newBoard = board.map(row => [...row]);
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      newBoard[j][SIZE - i - 1] = board[i][j];
    }
  }
  return newBoard;
};

const move = (board, direction, setScore) => {
  let newBoard = board.map(row => [...row]);
  for (let i = 0; i < direction; i++) {
    newBoard = rotateBoard(newBoard);
  }
  newBoard = moveLeft(newBoard, setScore);
  for (let i = 0; i < (4 - direction) % 4; i++) {
    newBoard = rotateBoard(newBoard);
  }
  return newBoard;
};

const Board = ({ board }) => (
  <div className="board">
    {board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((tile, colIndex) => (
          <div key={colIndex} className={`tile ${tile ? `tile-${tile}` : ''}`}>
            {tile}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Game2048Page = () => {
  const [board, setBoard] = useState(initializeBoard);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const handleKeyDown = (e) => {
    if (gameOver) return;
    let newBoard;
    switch (e.key) {
      case 'ArrowLeft':
        newBoard = move(board, 0, setScore);
        break;
      case 'ArrowUp':
        newBoard = move(board, 1, setScore);
        break;
      case 'ArrowRight':
        newBoard = move(board, 2, setScore);
        break;
      case 'ArrowDown':
        newBoard = move(board, 3, setScore);
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
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        handleKeyDown({ key: 'ArrowRight' });
      } else {
        handleKeyDown({ key: 'ArrowLeft' });
      }
    } else {
      if (dy > 0) {
        handleKeyDown({ key: 'ArrowDown' });
      } else {
        handleKeyDown({ key: 'ArrowUp' });
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
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [board, gameOver]);

  return (
    <div className="container-2048">
      <div className="game">
        <div className="score">Score: {score}</div>
        {gameOver && <div className="game-over">Game Over!</div>}
        <Board board={board} />
        <button onClick={() => {
          setBoard(initializeBoard());
          setScore(0);
          setGameOver(false);
        }}>Restart</button>
      </div>
    </div>
  );
};

export default Game2048Page;

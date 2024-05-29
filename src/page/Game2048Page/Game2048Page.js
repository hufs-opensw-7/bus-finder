import React, { useState, useEffect, useRef } from "react";
import Board from "../../components/Game2048Page/Board";
import "./Game2048Page.css";

const SIZE = 4;

const Game2048Page = () => {
  const [board, setBoard] = useState(createEmptyBoard(SIZE));
  const [score, setScore] = useState(0);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    initializeBoard();
    gameContainerRef.current.focus();
  }, []);

  const initializeBoard = () => {
    let newBoard = createEmptyBoard(SIZE);
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0); //새로운 게임 시 점수 리셋
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") handleMove("up");
    if (event.key === "ArrowDown") handleMove("down");
    if (event.key === "ArrowLeft") handleMove("left");
    if (event.key === "ArrowRight") handleMove("right");
  };

  const handleMove = (direction) => {
    let newBoard = [...board];
    let { movedBoard, points } = moveBoard(newBoard, direction);
    if (points > 0) {
      addRandomTile(movedBoard);
      setBoard(movedBoard);
      setScore(score + points);
    }
  };

  return (
    <div
      className="game-container"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      ref={gameContainerRef}
    >
      <div className="score">Score: {score}</div>
      <Board board={board} />
      <button className="new-game-button" onClick={initializeBoard}>
        New Game
      </button>
    </div>
  );
};

const createEmptyBoard = (size) => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));
};

const addRandomTile = (board) => {
  let emptyTiles = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) {
        emptyTiles.push({ r, c });
      }
    }
  }
  if (emptyTiles.length === 0) return;
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 2048) return;
    }
  }
  let { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
};

const moveBoard = (board, direction) => {
  let movedBoard = [...board];
  let points = 0;

  const moveRowLeft = (row) => {
    let arr = row.filter((val) => val);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        arr[i + 1] = 0;
        points += arr[i];
      }
    }
    arr = arr.filter((val) => val);
    while (arr.length < SIZE) {
      arr.push(0);
    }
    return arr;
  };

  const rotateLeft = (matrix) => {
    let result = [];
    for (let c = 0; c < SIZE; c++) {
      let newRow = [];
      for (let r = SIZE - 1; r >= 0; r--) {
        newRow.push(matrix[r][c]);
      }
      result.push(newRow);
    }
    return result;
  };

  const rotateRight = (matrix) => {
    let result = [];
    for (let c = SIZE - 1; c >= 0; c--) {
      let newRow = [];
      for (let r = 0; r < SIZE; r++) {
        newRow.push(matrix[r][c]);
      }
      result.push(newRow);
    }
    return result;
  };

  if (direction === "left") {
    for (let r = 0; r < SIZE; r++) {
      movedBoard[r] = moveRowLeft(movedBoard[r]);
    }
  } else if (direction === "right") {
    movedBoard = rotateRight(movedBoard);
    for (let r = 0; r < SIZE; r++) {
      movedBoard[r] = moveRowLeft(movedBoard[r]);
    }
    movedBoard = rotateLeft(movedBoard);
  } else if (direction === "up") {
    movedBoard = rotateLeft(movedBoard);
    for (let r = 0; r < SIZE; r++) {
      movedBoard[r] = moveRowLeft(movedBoard[r]);
    }
    movedBoard = rotateRight(movedBoard);
  } else if (direction === "down") {
    movedBoard = rotateRight(movedBoard);
    movedBoard = rotateRight(movedBoard);
    for (let r = 0; r < SIZE; r++) {
      movedBoard[r] = moveRowLeft(movedBoard[r]);
    }
    movedBoard = rotateRight(movedBoard);
    movedBoard = rotateRight(movedBoard);
  }

  return { movedBoard, points };
};

export default Game2048Page;

import { useState, useEffect } from 'react';

const randmonPosition = () => Math.floor(Math.random() * 399);

export const useBoardConfiguration = (boardSize) => {
  const DIMENSION = boardSize * boardSize;
  const LIMIT = DIMENSION - boardSize;

  const [snakePosition, setSnakePosition] = useState(0);
  const [foodPosition, setFoodPosition] = useState(randmonPosition);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const handleFood = (nextSnakePosition) => {
      if (nextSnakePosition === foodPosition) {
        setPoints(points + 1);
        let nextFoodPosition = randmonPosition();
        while (nextFoodPosition === nextSnakePosition) {
          nextFoodPosition = randmonPosition();
        }
        setTimeout(setFoodPosition(nextFoodPosition), 200);
      }
    };

    const moveSnake = (moves) => {
      const nextPosition = snakePosition + moves;
      setSnakePosition(nextPosition);
      handleFood(nextPosition);
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 40 && snakePosition < LIMIT) {
        moveSnake(boardSize);
      } else if (event.keyCode === 39 && (snakePosition + 1) % 20 !== 0) {
        moveSnake(1);
      } else if (event.keyCode === 38 && snakePosition >= boardSize) {
        moveSnake(-boardSize);
      } else if (event.keyCode === 37 && snakePosition % 20 !== 0) {
        moveSnake(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [snakePosition, foodPosition]);

  return [snakePosition, foodPosition, points];
};

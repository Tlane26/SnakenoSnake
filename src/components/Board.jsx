import styled from '@emotion/styled';
import { useBoardConfiguration } from '../hooks/useBoard';

const Box = styled.div`
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  width: 347px;
  margin: 40px auto;
`;

const Square = styled.div`
  height: 16px;
  width: 16px;
  border: 1px solid black;
  background-color: ${(props) => props.color}
`;

const Board = ({ size }) => {
  const [snakePosition, foodPosition, points] = useBoardConfiguration(size);

  const renderSquares = () => {
    const squares = [];

    for (let i = 0; i < size * size; i++) {
      if (i === snakePosition) {
        squares.push(<Square key={i} color="red" />);
      } else if (i === foodPosition) {
        squares.push(<Square key={i} color="blue" />);
      } else {
        squares.push(<Square key={i} />);
      }
    }
    return squares;
  };
  return <div>
    <p>Puntaje {points}</p>
    <Box>{renderSquares().map((square) => square)}</Box>
    </div>;
};

export default Board;

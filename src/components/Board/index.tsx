import React from 'react';
import Cell from 'components/Cell';
import { BoardState } from 'types';
import s from './Board.module.scss';

type Props = {
  boardState: BoardState;
  onClickCell: (cellNumber: number) => void;
  winningLine?: number[];
};

const Board = ({ boardState, onClickCell, winningLine = [] }: Props) => {
  return (
    <div className={s.board}>
      {boardState.map((playerSym, index) => (
        <Cell
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          value={playerSym}
          isFilled={winningLine.includes(index)}
          onClick={() => onClickCell(index)}
        />
      ))}
    </div>
  );
};

export default Board;

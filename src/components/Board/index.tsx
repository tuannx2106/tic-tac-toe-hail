import React from 'react';
import Cell from 'components/Cell';
import { PlayerSymbol } from 'types';
import s from './Board.module.scss';

type Props = {
  boardState: Array<PlayerSymbol | null>;
  onClickCell: (cellNumber: number) => void;
};

const Board = ({ boardState, onClickCell }: Props) => {
  return (
    <div className={s.board}>
      {boardState.map((playerSym, index) => (
        <Cell
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          value={playerSym}
          onClick={() => onClickCell(index)}
        />
      ))}
    </div>
  );
};

export default Board;

import React from 'react';
import { PlayerSymbol } from 'types';
import { IconO, IconX } from 'components/Icons';
import clsx from 'clsx';
import s from './Cell.module.scss';

type Props = {
  value: PlayerSymbol | null;
  onClick: () => void;
  isFilled?: boolean;
};

const Cell = ({ value, onClick, isFilled }: Props) => {
  return (
    <div
      role="presentation"
      onClick={onClick}
      className={clsx(s.cellRoot, {
        [s.filledBlue]: value === PlayerSymbol.X && isFilled,
        [s.filledYellow]: value === PlayerSymbol.O && isFilled,
      })}
    >
      {value === PlayerSymbol.O && <IconO isColored={!isFilled} />}
      {value === PlayerSymbol.X && <IconX isColored={!isFilled} />}
    </div>
  );
};

export default Cell;

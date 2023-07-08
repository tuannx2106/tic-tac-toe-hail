import React from 'react';
import { BoardCellState, PlayerSymbol } from 'types';
import { IconO, IconX } from 'components/Icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import s from './Cell.module.scss';

type Props = {
  value: BoardCellState;
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
      aria-label={`board cell ${value}`}
    >
      {value === PlayerSymbol.O && (
        <motion.div
          style={{ lineHeight: 0 }}
          animate={{ scale: [0, 1] }}
        >
          <IconO isColored={!isFilled} />
        </motion.div>
      )}
      {value === PlayerSymbol.X && (
        <motion.span
          style={{ lineHeight: 0 }}
          animate={{ scale: [0, 1] }}
        >
          <IconX isColored={!isFilled} />
        </motion.span>
      )}
    </div>
  );
};

export default Cell;

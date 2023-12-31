import clsx from 'clsx';
import React from 'react';
import { motion } from 'framer-motion';
import s from './GameStarts.module.scss';

type Props = {
  xWinNumber?: number;
  oWinNumber?: number;
  tiesNumber?: number;
};

const GameStats = ({ xWinNumber = 0, oWinNumber = 0, tiesNumber = 0 }: Props) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={s.gameStats}
    >
      <div className={clsx(s.card, s.isBlue)}>
        <p className={s.title}>X (P1)</p>
        <p
          className={s.stat}
          aria-label="player 1 winning number"
        >
          {xWinNumber}
        </p>
      </div>
      <div
        className={clsx(s.card, {
          [s.isDark]: tiesNumber === 0,
          [s.isSilver]: tiesNumber > 0,
        })}
      >
        <p className={s.title}>Ties</p>
        <p
          className={s.stat}
          aria-label="game draw number"
        >
          {tiesNumber}
        </p>
      </div>
      <div className={clsx(s.card, s.isYellow)}>
        <p className={s.title}>O (P2)</p>
        <p
          className={s.stat}
          aria-label="player 2 winning number"
        >
          {oWinNumber}
        </p>
      </div>
    </motion.div>
  );
};

export default GameStats;

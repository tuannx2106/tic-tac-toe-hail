import clsx from 'clsx';
import React from 'react';
import s from './GameStarts.module.scss';

type Props = {
  xWinNumber?: number;
  oWinNumber?: number;
  tiesNumber?: number;
};

const GameStats = ({ xWinNumber = 0, oWinNumber = 0, tiesNumber = 0 }: Props) => {
  return (
    <div className={s.gameStats}>
      <div className={clsx(s.card, s.isBlue)}>
        <p className={s.title}>X (P1)</p>
        <p className={s.stat}>{xWinNumber}</p>
      </div>
      <div
        className={clsx(s.card, {
          [s.isDark]: tiesNumber === 0,
          [s.isSilver]: tiesNumber > 0,
        })}
      >
        <p className={s.title}>Ties</p>
        <p className={s.stat}>{tiesNumber}</p>
      </div>
      <div className={clsx(s.card, s.isYellow)}>
        <p className={s.title}>X (P1)</p>
        <p className={s.stat}>{oWinNumber}</p>
      </div>
    </div>
  );
};

export default GameStats;

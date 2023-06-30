import React from 'react';
import { IconO, IconX } from 'components/Icons';
import s from './GameHeader.module.scss';

type Props = {
  gameMessage: React.ReactNode;
  onClickResetButton: () => void;
};

const GameHeader = ({ gameMessage, onClickResetButton }: Props) => {
  return (
    <div className={s.gameInfoArea}>
      <div className={s.iconGroup}>
        <IconX /> &nbsp;
        <IconO />
      </div>
      <p className={s.gameMessage}>{gameMessage}</p>
      <figure
        role="presentation"
        aria-label="reset button"
        onClick={onClickResetButton}
      >
        <img
          src="/img/img_replay-btn.png"
          alt="replay"
          style={{
            cursor: 'pointer',
            width: 52,
          }}
        />
      </figure>
    </div>
  );
};

export default GameHeader;

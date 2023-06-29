import React, { useState } from 'react';
import { PlayerSymbol } from 'types';
import StartScreen from 'components/StartScreen';
import { IconO, IconX } from 'components/Icons';
import Board from 'components/Board';
import Prompt from 'components/Prompt';
import s from './App.module.scss';

const App = () => {
  const [isResetPromptOpen, setIsResetPromptOpen] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [boardState, setBoardState] = useState<Array<PlayerSymbol | null>>(Array(9).fill(null));
  const [moveNumber, setMoveNumber] = useState(0);
  const isXTurn = moveNumber % 2 === 0;

  const onClickCell = (cellNumber: number) => {
    if (boardState[cellNumber]) return;
    const copiedBoard = boardState.slice();
    copiedBoard[cellNumber] = isXTurn ? PlayerSymbol.X : PlayerSymbol.O;
    setBoardState(copiedBoard);
    setMoveNumber((prev) => prev + 1);
  };

  const onCloseResetPrompt = () => setIsResetPromptOpen(false);

  const onResetGame = () => {
    setBoardState(Array(9).fill(null));
    setMoveNumber(0);
    onCloseResetPrompt();
  };

  if (!isStarted) {
    return <StartScreen onClickStart={() => setIsStarted(true)} />;
  }

  return (
    <div className={s.root}>
      <div className="container">
        <div className={s.gameInfoArea}>
          <div className={s.iconGroup}>
            <IconX /> &nbsp;
            <IconO />
          </div>
          <p className={s.gameMessage}>{isXTurn ? <IconX isColored={false} /> : <IconO isColored={false} />} turn</p>
          <figure
            role="presentation"
            aria-label="reset button"
            onClick={() => setIsResetPromptOpen(true)}
          >
            <img
              src="img/img_replay-btn.png"
              alt="replay"
              style={{
                cursor: 'pointer',
                width: 52,
              }}
            />
          </figure>
        </div>
        <Board
          boardState={boardState}
          onClickCell={onClickCell}
        />
      </div>
      <Prompt
        isOpen={isResetPromptOpen}
        onClose={onCloseResetPrompt}
        title="RESTART GAME?"
        onOk={onResetGame}
        okBtnProps={{
          style: {
            width: 140,
          },
        }}
      />
    </div>
  );
};

export default App;

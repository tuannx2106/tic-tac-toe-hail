import React, { useEffect, useState } from 'react';
import { BoardState, PlayerSymbol } from 'types';
import StartScreen from 'components/StartScreen';
import { IconO, IconX } from 'components/Icons';
import Prompt from 'components/Prompt';
import Board from 'components/Board';
import s from './App.module.scss';
import { hasWinner } from './utils';

const App = () => {
  const [isResetPromptOpen, setIsResetPromptOpen] = useState(false);
  const [isGameHasWinnerPromptOpen, setIsGameHasWinnerPromptOpen] = useState(false);
  const [isGameTiePromptOpen, setIsGameTiePromptOpen] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [boardState, setBoardState] = useState<BoardState>(Array(9).fill(null));
  const [moveNumber, setMoveNumber] = useState(0);

  const isXTurn = moveNumber % 2 === 0;
  const { winner, winningLine } = hasWinner(boardState);
  const isGameTie = !winner && boardState.reduce((acc, current) => Boolean(acc && current), true);

  const getGameMessage = () => {
    if (winner) {
      return <>{winner === PlayerSymbol.X ? <IconX isColored={false} /> : <IconO isColored={false} />} turn</>;
    }
    return <>{isXTurn ? <IconX isColored={false} /> : <IconO isColored={false} />} turn</>;
  };

  const onClickCell = (cellNumber: number) => {
    if (boardState[cellNumber] || winner) return;
    const copiedBoard = boardState.slice();
    copiedBoard[cellNumber] = isXTurn ? PlayerSymbol.X : PlayerSymbol.O;
    setBoardState(copiedBoard);
    setMoveNumber((prev) => prev + 1);
  };

  const onCloseResetPrompt = () => setIsResetPromptOpen(false);
  const onCloseGameHasWinnerPrompt = () => setIsGameHasWinnerPromptOpen(false);
  const onCloseGameTiePrompt = () => setIsGameTiePromptOpen(false);

  const onResetGame = () => {
    setBoardState(Array(9).fill(null));
    setMoveNumber(0);
    onCloseResetPrompt();
    onCloseGameHasWinnerPrompt();
    onCloseGameTiePrompt();
  };

  useEffect(() => {
    if (winner) setIsGameHasWinnerPromptOpen(true);
  }, [winner]);

  useEffect(() => {
    if (isGameTie) setIsGameTiePromptOpen(true);
  }, [isGameTie]);

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
          <p className={s.gameMessage}>{getGameMessage()}</p>
          <figure
            role="presentation"
            aria-label="reset button"
            onClick={() => setIsResetPromptOpen(true)}
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
        <Board
          boardState={boardState}
          onClickCell={onClickCell}
          winningLine={winningLine}
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
      <Prompt
        isOpen={isGameTiePromptOpen}
        onClose={onCloseGameTiePrompt}
        title="ROUND TIED"
        onOk={onResetGame}
        cancelText="Quit"
        okText="Next round"
      />
      <Prompt
        isOpen={isGameHasWinnerPromptOpen}
        onClose={onCloseGameHasWinnerPrompt}
        titleLead={winner && `PLAYER ${winner === PlayerSymbol.O ? 1 : 2} WINS!`}
        title={
          <span className={s.gameOverMessage}>
            {winner === PlayerSymbol.X ? <IconX /> : <IconO />}
            <span
              style={{
                color: `var(--cl-light-${winner === PlayerSymbol.O ? 'yellow' : 'blue'})`,
              }}
            >
              TAKES THE ROUND
            </span>
          </span>
        }
        onOk={onResetGame}
        cancelText="Quit"
        okText="Next round"
      />
    </div>
  );
};

export default App;

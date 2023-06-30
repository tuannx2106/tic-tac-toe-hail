import React, { useEffect, useState } from 'react';
import { BoardState, PlayerSymbol } from 'types';
import StartScreen from 'components/StartScreen';
import { IconO, IconX } from 'components/Icons';
import Prompt from 'components/Prompt';
import Board from 'components/Board';
import GameStats from 'components/GameStats';
import GameHeader from 'components/GameHeader';
import s from './App.module.scss';
import { hasWinner } from './utils';

const X_WINNING_NUMBER_LOCAL_STORAGE_KEY = 'xWinningNumber';
const O_WINNING_NUMBER_LOCAL_STORAGE_KEY = 'oWinningNumber';
const TIES_NUMBER_LOCAL_STORAGE_KEY = 'tiesNumber';

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

  // When there is a winner
  useEffect(() => {
    if (winner) {
      setIsGameHasWinnerPromptOpen(true);

      // record winner to local storage
      if (winner === PlayerSymbol.O) {
        const currentOWinningNumber = Number(localStorage.getItem(O_WINNING_NUMBER_LOCAL_STORAGE_KEY)) || 0;
        localStorage.setItem(O_WINNING_NUMBER_LOCAL_STORAGE_KEY, String(currentOWinningNumber + 1));
      } else {
        const currentXWinningNumber = Number(localStorage.getItem(X_WINNING_NUMBER_LOCAL_STORAGE_KEY)) || 0;
        localStorage.setItem(X_WINNING_NUMBER_LOCAL_STORAGE_KEY, String(currentXWinningNumber + 1));
      }
    }
  }, [winner]);

  // When the game tie
  useEffect(() => {
    if (isGameTie) {
      setIsGameTiePromptOpen(true);

      // record to local storage
      const currenTiesGameNumber = Number(localStorage.getItem(TIES_NUMBER_LOCAL_STORAGE_KEY)) || 0;
      localStorage.setItem(TIES_NUMBER_LOCAL_STORAGE_KEY, String(currenTiesGameNumber + 1));
    }
  }, [isGameTie]);

  if (!isStarted) {
    return <StartScreen onClickStart={() => setIsStarted(true)} />;
  }

  return (
    <div className={s.root}>
      <div className="container">
        <GameHeader
          gameMessage={getGameMessage()}
          onClickResetButton={onResetGame}
        />
        <Board
          boardState={boardState}
          onClickCell={onClickCell}
          winningLine={winningLine}
        />
        <GameStats
          xWinNumber={Number(localStorage.getItem(X_WINNING_NUMBER_LOCAL_STORAGE_KEY))}
          oWinNumber={Number(localStorage.getItem(O_WINNING_NUMBER_LOCAL_STORAGE_KEY))}
          tiesNumber={Number(localStorage.getItem(TIES_NUMBER_LOCAL_STORAGE_KEY))}
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
        titleLead={winner && `PLAYER ${winner === PlayerSymbol.O ? 2 : 1} WINS!`}
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

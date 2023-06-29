import { BoardState, PlayerSymbol } from 'types';

export const hasWinner = (board: BoardState): { winner: PlayerSymbol | null; winningLine: number[] } => {
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningPositions.length; i++) {
    const [a, b, c] = winningPositions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningLine: winningPositions[i],
      };
    }
  }
  return {
    winner: null,
    winningLine: [],
  };
};

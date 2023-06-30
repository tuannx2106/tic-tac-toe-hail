import { PlayerSymbol } from 'types';
import { hasWinner } from './utils';

describe('hasWinner function', () => {
  it('should cover all 8 cases of winning position', () => {
    const all8WinnerXCase = [
      [PlayerSymbol.X, PlayerSymbol.X, PlayerSymbol.X, PlayerSymbol.O, PlayerSymbol.O, null, null, null, null],
      [PlayerSymbol.O, PlayerSymbol.O, null, PlayerSymbol.X, PlayerSymbol.X, PlayerSymbol.X, null, null, null],
      [null, null, null, PlayerSymbol.O, PlayerSymbol.O, null, PlayerSymbol.X, PlayerSymbol.X, PlayerSymbol.X],
      [PlayerSymbol.X, null, PlayerSymbol.O, PlayerSymbol.X, PlayerSymbol.O, null, PlayerSymbol.X, null, null],
      [null, PlayerSymbol.X, PlayerSymbol.O, null, PlayerSymbol.X, null, PlayerSymbol.O, PlayerSymbol.X, null],
      [null, PlayerSymbol.O, PlayerSymbol.X, null, PlayerSymbol.O, PlayerSymbol.X, null, null, PlayerSymbol.X],
      [PlayerSymbol.X, PlayerSymbol.O, null, null, PlayerSymbol.X, PlayerSymbol.O, null, null, PlayerSymbol.X],
      [null, PlayerSymbol.O, PlayerSymbol.X, null, PlayerSymbol.X, PlayerSymbol.O, PlayerSymbol.X, null, null],
    ];

    all8WinnerXCase.forEach((board) => expect(hasWinner(board).winner).toBe(PlayerSymbol.X));
  });

  it('should return correct winner and winning line', () => {
    const testBoard = [
      PlayerSymbol.O,
      PlayerSymbol.O,
      PlayerSymbol.O,
      PlayerSymbol.X,
      PlayerSymbol.X,
      null,
      null,
      null,
      null,
    ];
    const expectedWinner = PlayerSymbol.O;
    const expectedWinLine = [0, 1, 2];

    expect(hasWinner(testBoard).winner).toBe(expectedWinner);
    expectedWinLine.forEach((position) => expect(hasWinner(testBoard).winningLine).toContain(position));
  });
});

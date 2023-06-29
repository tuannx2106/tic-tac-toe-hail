export enum PlayerSymbol {
  X = 'x',
  O = 'o',
}

export type BoardCellState = PlayerSymbol | null;

export type BoardState = Array<BoardCellState>;

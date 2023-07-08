/* eslint-disable no-unused-expressions */
import React from 'react';
import { RenderResult, act, cleanup, render } from '@testing-library/react';
import App from './App';

const getSetupScreen = async () => {
  const screen = render(<App />);
  const btnStartGame = await screen.findByText(/start game/i);
  act(() => btnStartGame.click());
  return screen;
};

const promptOverlayEle = document.createElement('div');

describe('App.tsx', () => {
  beforeEach(() => {
    promptOverlayEle.setAttribute('id', 'prompt-overlay');
    document.body.appendChild(promptOverlayEle);
  });

  afterEach(() => {
    cleanup();
    promptOverlayEle.remove();
  });

  describe('Before game start', () => {
    it('should render a button to start the game.', async () => {
      const screen = render(<App />);
      await screen.findByText(/start game/i);
    });
  });

  describe('Game started', () => {
    it('should render 9 cells, button restart, all 3 boxes of the game stats are 0', async () => {
      const screen = await getSetupScreen();
      await screen.findByLabelText(/reset button/i);
      const cells = await screen.findAllByLabelText(/board cell/i);
      expect(cells.length).toBe(9);

      const xWinningNumber = await screen.findByLabelText(/player 1 winning number/i);
      expect(xWinningNumber.innerHTML).toBe('0');

      const oWinningNumber = await screen.findByLabelText(/player 2 winning number/i);
      expect(oWinningNumber.innerHTML).toBe('0');

      const drawGameNumber = await screen.findByLabelText(/game draw number/i);
      expect(drawGameNumber.innerHTML).toBe('0');
    });

    it('Player 1 (X) starts first. Then player 2 (O). They play alternately.', async () => {
      const screen = await getSetupScreen();
      const cells = await screen.findAllByLabelText(/board cell/i);
      act(() => cells[0].click());
      act(() => cells[1].click());
      act(() => cells[2].click());
      const xNumber = await screen.findAllByLabelText(/board cell x/i);
      const oNumber = await screen.findAllByLabelText(/board cell o/i);
      expect(xNumber.length).toBe(2);
      expect(oNumber.length).toBe(1);
    });

    it('A prompt to reset game shown up when click reset game button', async () => {
      const screen = await getSetupScreen();
      const resetButton = await screen.findByLabelText(/reset button/i);
      act(() => resetButton.click());
      screen.findByText(/RESTART GAME?/i);
      screen.findByText(/Yes/i);
      screen.findByText(/No, Cancel/i);
    });

    it('The game should be reset and the players can start again from the beginning when click the Ok button', async () => {
      const screen = await getSetupScreen();

      const cells = await screen.findAllByLabelText(/board cell/i);
      act(() => cells[0].click());
      act(() => cells[1].click());
      act(() => cells[2].click());
      const xNumber = await screen.findAllByLabelText(/board cell x/i);
      const oNumber = await screen.findAllByLabelText(/board cell o/i);
      expect(xNumber.length).toBe(2);
      expect(oNumber.length).toBe(1);

      const resetButton = await screen.findByLabelText(/reset button/i);
      act(() => resetButton.click());

      const confirmBtn = await screen.findByText(/Yes/i);
      act(() => confirmBtn.click());

      const cellsWithoutValue = await screen.findAllByLabelText(/board cell null/i);
      expect(cellsWithoutValue.length).toBe(9);
    });

    describe('When there is a winner is player 1 (X)', () => {
      let _screen: RenderResult;

      beforeEach(async () => {
        _screen = await getSetupScreen();
        const cells = await _screen.findAllByLabelText(/board cell/i);
        act(() => cells[0].click());
        act(() => cells[1].click());
        act(() => cells[4].click());
        act(() => cells[5].click());
        act(() => cells[8].click());
      });

      afterEach(() => {
        localStorage.clear();
      });

      it('Should show winner prompt with correct winner', async () => {
        await _screen.findByText(/player 1 wins/i);
      });

      it('Should show correct winning number of player 1', async () => {
        const winningNumber = await _screen.findByLabelText(/player 1 winning number/i);
        expect(winningNumber.innerHTML).toBe('1');
      });
    });

    describe('When there is a winner is player 2 (O)', () => {
      let _screen: RenderResult;

      beforeEach(async () => {
        _screen = await getSetupScreen();
        const cells = await _screen.findAllByLabelText(/board cell/i);
        act(() => cells[0].click());
        act(() => cells[1].click());
        act(() => cells[3].click());
        act(() => cells[4].click());
        act(() => cells[5].click());
        act(() => cells[7].click());
      });

      afterEach(() => {
        localStorage.clear();
      });

      it('Should show winner prompt with correct winner', async () => {
        await _screen.findByText(/player 2 wins/i);
      });

      it('Should show correct winning number of player 2', async () => {
        const winningNumber = await _screen.findByLabelText(/player 2 winning number/i);
        expect(winningNumber.innerHTML).toBe('1');
      });
    });

    describe('When it is a draw game', () => {
      let _screen: RenderResult;

      beforeEach(async () => {
        _screen = await getSetupScreen();
        const cells = await _screen.findAllByLabelText(/board cell/i);
        act(() => cells[0].click());
        act(() => cells[1].click());
        act(() => cells[2].click());
        act(() => cells[3].click());
        act(() => cells[5].click());
        act(() => cells[4].click());
        act(() => cells[6].click());
        act(() => cells[8].click());
        act(() => cells[7].click());
      });

      afterEach(() => {
        localStorage.clear();
      });

      it('Should show ties game prompt when there is no winner and no more empty cell', async () => {
        const cellsWithoutValue = await _screen.findAllByLabelText(/board cell\s[x|o]/i);
        expect(cellsWithoutValue.length).toBe(9);
        await _screen.findByText(/ROUND TIED/i);
      });

      it('Should show a correct ties game number', async () => {
        const tiesGameNumber = await _screen.findByLabelText(/game draw number/i);
        expect(tiesGameNumber.innerHTML).toBe('1');
      });
    });
  });
});

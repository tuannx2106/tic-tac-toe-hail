/* eslint-disable no-unused-expressions */
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App.tsx', () => {
  it('should render a button to start the game.', () => {
    render(<App />);
  });
  it('should render 9 cells, button restart, 3 boxes for the game stats after start the game', () => {
    test.todo;
  });
  it('Player 1 (X) starts first. Then player 2 (O). They play alternately.', () => {
    test.todo;
  });
  it('A prompt to reset game shown up when click reset game button', () => {
    test.todo;
  });
  it('The game should be reset and the players can start again from the beginning when click the Ok button', () => {
    test.todo;
  });
  it('Should show winner prompt with correct winner', () => {
    test.todo;
  });
  it('Should show ties game prompt when there is no winner and no more empty cell', () => {
    test.todo;
  });
});

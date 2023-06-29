import { Button } from 'components/Button';
import React from 'react';
import { styled } from 'styled-components';

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

type Props = {
  onClickStart: () => void;
};

const StartScreen = ({ onClickStart }: Props) => {
  return (
    <StyledRoot>
      <div className="container">
        <Button
          variant="primaryLg"
          style={{ width: '100%' }}
          onClick={onClickStart}
        >
          Start game
        </Button>
      </div>
    </StyledRoot>
  );
};

export default StartScreen;

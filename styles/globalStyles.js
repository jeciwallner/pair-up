import { css } from '@emotion/react';

const reset = css`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: blanchedalmond;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

export const myGlobalStyles = css`
  ${reset}

  .errorStyles {
    color: #ff0077;
  }
  .wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

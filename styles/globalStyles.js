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
  html {
    height: 100%;
  }
  body {
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
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
  /* Header: */
  .navStyles {
    display: flex;
    gap: 10px;
    background-color: turquoise;
    color: black;
  }
  .wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .container {
    display: grid, inline-grid;
  }

  .footerStyles {
    height: 50px;
    margin-top: -50px;

    gap: 10px;
    background-color: turquoise;
    color: black;
  }
  .errorStyles {
    color: #ff0077;
  }
  .grid-container {
    display: inline-grid;
  }
`;

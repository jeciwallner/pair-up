import { css } from '@emotion/react';

// background: #fdfdf6;
// font-family: fantasy;

const reset = css`
  #__next {
    width: 100%;
  }
`;

export const myGlobalStyles = css`
  ${reset}

  button {
    background-color: #499be7;
    padding: 0.5em;
    border-radius: 32px;
    border-color: #073162;
    color: #073162;
    font-size: 1em;
    width: 25em;
    max-width: 80vw;
    cursor: pointer;
    align-self: center;
    &:active {
      transform: scale(1.05);
    }
    &:hover {
      opacity: 0.6;
    }
  }

  footer {
    display: flex;
    padding: 0.5rem;
    margin-top: 10px;
    gap: 10px;
    position: sticky;
  }

  error {
    color: #ff0077;
  }

  .column {
    float: left;
    width: 33%;
    padding: 5px;
  }

  /* Clear floats after image containers */
  .row::after {
    content: '';
    clear: both;
    display: table;
  }
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;

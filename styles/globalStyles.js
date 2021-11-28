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

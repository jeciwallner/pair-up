import { css } from '@emotion/react';

const footerStyles = css`
  grid-row-start: 2;
  grid-row-end: 3;
  display: flex;
  gap: 10px;
  background-color: turquoise;
  color: black;
`;

export default function Footer() {
  return <footer css={footerStyles}>PairUp! 2021</footer>;
}

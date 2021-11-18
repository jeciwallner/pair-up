import { css } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

const wrapper = css`
   {
    display: grid;
    grid-gap: 50px 100px;
    grid-column-gap: 50px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default function Layout(props) {
  return (
    <div css={wrapper}>
      <Header />
      <div>{props.children}</div>
      <Footer className="footerStyles" />
    </div>
  );
}

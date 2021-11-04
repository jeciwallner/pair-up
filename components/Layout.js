import { css } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div className="wrapper">
      <Header />
      <div>{props.children}</div>
      <Footer className="footerStyles" />
    </div>
  );
}

import { css } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header />
      <div className="wrapper">
        {props.children}
        <Footer />
      </div>
    </div>
  );
}

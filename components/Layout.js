import { css, Global } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

// create class: wrapper:
// min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;

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

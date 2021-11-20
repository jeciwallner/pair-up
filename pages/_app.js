// this is my main component where the app is going to be rendered.

import 'bootstrap/dist/css/bootstrap.css';
import { Global } from '@emotion/react';
import Head from 'next/head';
import { myGlobalStyles } from '../styles/globalStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={myGlobalStyles} />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

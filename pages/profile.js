import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const formStyles = css`
  label {
    display: block;
    color: #073162;
  }
`;

export default function Profile(props) {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - My Profile</title>
      </Head>
      <form css={formStyles}>
        <label>
          rhubarbrhubarbrhubarb
          <input />
        </label>
        <label>
          blablabla
          <input />
        </label>
        <button>Commit</button>
      </form>
      ;
      <form css={formStyles}>
        <label>
          rhubarbrhubarbrhubarb
          <input />
        </label>
        <label>
          blablabla
          <input />
        </label>
        <button>Commit</button>
      </form>
      ;
      <img src="/oldies.gif" alt="animated dancing couple" />
      {JSON.stringify(props.stylesList)}
    </Layout>
  );
}

// I need the user to make a choice whether they are a follower or leader and what their favourite schools and styles are.

export async function getServerSideProps() {
  const { getStyles } = await import('../util/database');

  const stylesList = await getStyles();

  console.log(stylesList);
  return {
    props: {
      stylesList,
    },
  };
}

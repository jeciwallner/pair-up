import Head from 'next/head';
import Layout from '../components/Layout';

export default function Profile(props) {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - My Profile</title>
      </Head>
      <img src="/oldies.gif" alt="animated dancing couple" />
      {JSON.stringify(props.stylesList)}
    </Layout>
  );
}

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

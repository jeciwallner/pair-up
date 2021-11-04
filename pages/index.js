// This is my home / my landing page

import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import ottBallroomPic from '../public/images/ottBallroom.gif';

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - Home</title>
      </Head>
      <div>Home</div>
      <Image src={ottBallroomPic} alt="animated dancing couple" />
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

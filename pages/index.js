// This is my home / my landing page

import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import ottBallroomPic from '../public/images/ottBallroom.gif';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - Home</title>
      </Head>
      <div>Home</div>
      <Image src={ottBallroomPic} alt="animated dancing couple" />
      <img src="/oldies.gif" alt="animated dancing couple" />
    </Layout>
  );
}

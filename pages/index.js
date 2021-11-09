// This is my home / my landing page

import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import classical from '../public/images/classical.jpeg';
import cleveland from '../public/images/cleveland.jpeg';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - Home</title>
      </Head>
      <Image src={cleveland} alt="dancing couple in downtown cleveland" />
      <div>
        Welcome to PairUp! We are delighted to see you here and so on and so
        forth...
      </div>
      <Image src={classical} alt="classical dancing couple" />
    </Layout>
  );
}

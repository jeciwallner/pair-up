import Head from 'next/head';
import Layout from '../components/Layout';

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - Login</title>
      </Head>
      <div>Login Page</div>
      <img src="/dancingCouple.gif" alt="animated dancing couple" />
    </Layout>
  );
}

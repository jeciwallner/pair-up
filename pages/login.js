import Head from 'next/head';
import Layout from '../components/Layout';

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - Login</title>
      </Head>
      <img src="/dancingCouple.gif" alt="animated dancing couple" />
    </Layout>
  );
}

// Create the record in the sessions table with a new token:
// 1. create a token
// 2. do a DB query to add the session record
// set the response to create the cookie in the browser

// actual UI code
// fetch to the API Route

import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

// import { Errors } from '../util/types';
// import { RegisterResponse } from './api/register';

const formStyles = css`
  label {
    display: block;
  }
`;

const errorsStyle = css`
  color: #ff0077;
`;

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout>
      <Head>
        <title>Pair Up! - Sign Up</title>
      </Head>
      <h1>Sign Up</h1>
      <form
        css={formStyles}
        onSubmit={async (event) => {
          event.preventDefault();
          await fetch('/api/signUp', {
            method: 'POST',
            headers: {
              // if I don't set this it won't know it's data in the json format!
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          });
        }}
      >
        <label>
          Username
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          Email-Address
          <input
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>Sign Me Up!</button>
      </form>
      <br></br>
      <img src="/ballroom.gif" alt="animated dancing couple" />
    </Layout>
  );
}

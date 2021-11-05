// actual UI code
// fetch to the API Route

import { css } from '@emotion/react';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { RegisterResponse } from './api/sign_up';

// import { Errors } from '../util/types';
// import { RegisterResponse } from './api/register';

const formStyles = css`
  label {
    display: block;
    color: 073162;
  }
`;

const errorsStyle = css`
  color: #ff0077;
`;

export default function SignUpPage() {
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
          await fetch('/api/sign_up', {
            method: 'POST',
            headers: {
              // if I don't set this it won't know, that it's data in the json format!
              'Content-Type': 'application/json',
            },
            // this body turns into req.body inside the API Route:
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
            type="email"
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

// this is going to be my API route, the page is going to communicate with!
// in the API Route I am getting the username and password (not yet a hashed password)
// somewhere in this code happens some magic to convert a password to a hashed password!
export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('req.body', req.body);
  res.send(null);
}

/*  res.send is similar to return - I am sending a response back to the browser */

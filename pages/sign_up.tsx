// actual UI code
// fetch to the API Route

import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { SignUpResponse } from './api/sign_up';

const formStyles = css`
  label {
    display: block;
    color: #073162;
  }
`;
const errorStyles = css`
  color: #ff0077;
`;

type Props = { refreshUsername: () => void; crsfToken: string };

export default function SignUpPage(props: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

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

          const signUpResponse = await fetch('/api/sign_up', {
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
              csrfToken: props.csrfToken,
            }),
          });
          const signUpJson = (await signUpResponse.json()) as SignUpResponse;

          // typeguard thingy from typescript:
          if ('errors' in signUpJson) {
            setErrors(signUpJson.errors);
            return;
          }

          const destination =
            typeof router.query.returnTo === 'string' && router.query.returnTo
              ? router.query.returnTo
              : `/users/${signUpJson.user.id}`;

          props.refreshUsername();

          router.push(destination);
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
      <img src="/ballroom.gif" alt="animated dancing couple" />
      <div css={errorStyles}>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </Layout>
  );
}

// this is going to be my API route, the page is going to communicate with!
// in the API Route I am getting the username and password
// then the password needs to be converted to a hashed password

/*  res.send is similar to return - I am sending a response back to the browser */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../util/database');
  const { createToken } = await import('../util/csrf');

  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  console.log(session);

  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: createToken(),
    },
  };
}

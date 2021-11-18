// actual UI code
// fetch to the API Route
import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { LoginResponse } from './api/login';

const formStyles = css`
  label {
    display: block;
    color: #073162;
  }
`;
const errorStyles = css`
  color: #ff0077;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Pair Up! - Login</title>
      </Head>
      <h1>Login</h1>
      <form
        css={formStyles}
        onSubmit={async (event) => {
          event.preventDefault();

          const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // this body turns into req.body inside the API Route:
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          const loginJson = (await loginResponse.json()) as LoginResponse;

          if ('errors' in loginJson) {
            setErrors(loginJson.errors);
            return;
          }

          const destination =
            typeof router.query.returnTo === 'string' && router.query.returnTo
              ? router.query.returnTo
              : `/profile`;
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
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <div css={errorStyles}>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
      <img src="/dancingCouple.gif" alt="animated dancing couple" />
    </Layout>
  );
}

// This is going to be my API route, the page is going to communicate with.
// In the API Route I am getting the username and password,
// then the password needs to be converted to a hashed password.

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
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.sessionTokenSignUp;

  const session = await getValidSessionByToken(sessionToken);

  console.log('I am not sure when exactly I appear.', session);

  if (session) {
    return {
      redirect: {
        destination: '/profile',
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

// Create the record in the sessions table with a new token:
// 1. create a token
// 2. do a DB query to add the session record
// set the response to create the cookie in the browser

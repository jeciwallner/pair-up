// this is UI code
// fetch to the API Route
import 'bootstrap/dist/css/bootstrap.css';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { SignUpResponse } from './api/sign_up';

type Props = { csrfToken: string };

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
      <div className="container">
        <h1>Sign Up</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const signUpResponse = await fetch('/api/sign_up', {
              method: 'POST',
              headers: {
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

            if ('errors' in signUpJson) {
              setErrors(signUpJson.errors);
              return;
            }

            const destination =
              typeof router.query.returnTo === 'string' && router.query.returnTo
                ? router.query.returnTo
                : `/profile`;
            router.push(destination);
          }}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email-Address
            </label>
            <input
              id="email"
              className="form-control"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
          <button className="btn btn-primary">Sign Me Up!</button>
        </form>
        <img src="/oldies.gif" alt="animated old-fashioned dancing couple" />
        <div className="error">
          {errors.map((error) => (
            <div key={`error-${error.message}`}>{error.message}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../util/database');
  const { createToken } = await import('../util/csrf');

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

  if (session) {
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

// actual UI code
// fetch to the API Route

import 'bootstrap/dist/css/bootstrap.css';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { LoginResponse } from './api/login';

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
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h1>Login</h1>
            <form
              className="form"
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
                  typeof router.query.returnTo === 'string' &&
                  router.query.returnTo
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
              <button className="btn btn-primary">Login</button>
            </form>
            <div className="error">
              {errors.map((error) => (
                <div key={`error-${error.message}`}>{error.message}</div>
              ))}
            </div>
            <img
              src="/oldies.gif"
              alt="animated old-fashioned dancing couple"
            />
          </div>
        </div>
      </div>
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

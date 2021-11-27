import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getMatchingUser, getMyRole } from '../util/database';

export default function Profile(props) {
  const [matches, setMatches] = useState();

  return (
    <Layout user={props.user}>
      <Head>
        <title>Pair Up! - My Search</title>
      </Head>
      <div className="container">
        <h1>The search commences....</h1>
        <p>{props.user.username}, now it's time match you up.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h2 className="mb-3">Let's find you a Dance Partner!</h2>
          <button className="btn btn-primary">Match my Preferences.</button>
        </form>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email Address</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {props.partnerList.map((match) => {
                return (
                  <tr key={match.id}>
                    <td>{match.username}</td>
                    <td>{match.email}</td>
                    <td>{match.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <img src="/oldies.gif" alt="animated old-fashioned dancing couple" />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getUserBySessionToken } = await import('../util/database');

  const isValidUser = await getUserBySessionToken(
    context.req.cookies.sessionTokenSignUp,
  );

  if (!isValidUser) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?returnTo=/profile',
      },
    };
  }

  const { getRoles } = await import('../util/database');

  const rolesList = await getRoles();

  const rolesNames = rolesList.map((roles) => ({
    value: roles.id,
    label: roles.name,
  }));

  // from here on, it doesn't seem to work:

  const myRole = await getMyRole(isValidUser.id);
  console.log('my role', myRole);

  const getMatches = await getMatchingUser(myRole[0].roleId);

  console.log(myRole);

  console.log('matches', getMatches);

  return {
    props: {
      rolesList: rolesNames,
      user: isValidUser,
      partnerList: getMatches,
    },
  };
}

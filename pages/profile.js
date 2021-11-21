import Head from 'next/head';
import { useState } from 'react';
import Select from 'react-select';
import Layout from '../components/Layout';

export default function Profile(props) {
  const [role, setRole] = useState(null);
  const [styles, setStyles] = useState([]);
  const [schools, setSchools] = useState([]);

  return (
    <Layout>
      <Head>
        <title>Pair Up! - My Profile</title>
      </Head>
      <div className="container">
        <h1>Hello {props.user.username}!</h1>
        <p>
          So good, to see, that you want to dust off your dancing shoes and
          start moving your creaky bones!
          <br /> We are here to help you find you an awesome dance partner to
          share your passion and join in the fun! But first, please let us know,
          which Styles and Schools in Vienna you are particularly interested in,
          so we can help you better!
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await fetch('api/profile', {
              method: 'POST',
              // letter head:
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                role,
                styles,
                schools,
              }),
            });
          }}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="role">
              Chose your preferred role.
            </label>
            <Select
              id="role"
              options={props.rolesList}
              value={role}
              onChange={(event) => setRole(event)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="styles">
              Chose your preferred dance styles.
            </label>
            <Select
              id="styles"
              options={props.stylesList}
              isMulti
              value={styles}
              onChange={(event) => setStyles(event)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="schools">
              Choose your preferred dance schools.
            </label>
            <Select
              id="schools"
              options={props.schoolsList}
              isMulti
              value={schools}
              onChange={(event) => setSchools(event)}
            />
          </div>
          <button className="btn btn-primary">Commit Preferences</button>
        </form>
        <br />
        <img src="/oldies.gif" alt="animated dancing couple" />
      </div>
    </Layout>
  );
}

// if user is signed in, redirect to his profile page and display choices etc.

export async function getServerSideProps(context) {
  const { getUserBySessionToken } = await import('../util/database');

  // Authorization: Allow only logged-in users
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
  const { getStyles } = await import('../util/database');
  const { getSchools } = await import('../util/database');

  const rolesList = await getRoles();

  const rolesNames = rolesList.map((roles) => ({
    value: roles.id,
    label: roles.name,
  }));

  const stylesList = await getStyles();

  const names = stylesList.map((styles) => ({
    value: styles.id,
    label: styles.name,
  }));

  const schoolsList = await getSchools();

  const schoolsNames = schoolsList.map((schools) => ({
    value: schools.id,
    label: schools.name,
  }));

  return {
    props: {
      rolesList: rolesNames,
      stylesList: names,
      schoolsList: schoolsNames,
      user: isValidUser,
    },
  };
}

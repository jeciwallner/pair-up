import Head from 'next/head';
import Select from 'react-select';
import Layout from '../components/Layout';

export default function Profile(props) {
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
        <form>
          <div className="mb-3">
            <label className="form-label" for="role">
              What are you looking for?
            </label>
            <Select id="role" options={props.rolesList} />
          </div>
          <div className="mb-3">
            <label className="form-label" for="styles">
              Chose your preferred dance styles.
            </label>
            <Select id="styles" options={props.stylesList} isMulti />
          </div>
          <div className="mb-3">
            <label className="form-label" for="schools">
              Choose your preferred dance schools.
            </label>
            <Select id="schools" options={props.schoolsList} isMulti />
          </div>
          <button className="btn btn-primary">Find a Dance Partner!</button>
        </form>
        <br />
        <img src="/oldies.gif" alt="animated dancing couple" />
        {/* {JSON.stringify(props.rolesList)} */}
        {/* {JSON.stringify(props.stylesList)}
      {JSON.stringify(props.schoolsList)} */}
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

  // This code is linked to the respective join query in the database.
  // const { getStylesByDancer } = await import('../util/database');
  // const stylesList = await getStylesByDancer();

  return {
    props: {
      rolesList: rolesNames,
      stylesList: names,
      schoolsList: schoolsNames,
      user: isValidUser,
    },
  };
}

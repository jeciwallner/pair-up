import { css } from '@emotion/react';
import Head from 'next/head';
import Select from 'react-select';
import Layout from '../components/Layout';

const formStyles = css`
  label {
    color: #073162;
    display: inline-grid;
  }
`;

export default function Profile(props) {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - My Profile</title>
      </Head>
      <p>Hello {props.user.username}!</p>
      <form css={formStyles}>
        <br />
        <p>Chose your preferred dance styles.</p>
        <Select options={props.stylesList} isMulti />
        <br />
        <p>Chose your preferred dance schools.</p>
        <Select options={props.schoolsList} isMulti />
        <br />
        <button>Find a Dance Partner!</button>
      </form>
      <br />
      <img src="/oldies.gif" alt="animated dancing couple" />
      {/* {JSON.stringify(props.rolesList)} */}
      {/* {JSON.stringify(props.stylesList)}
      {JSON.stringify(props.schoolsList)} */}
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

  // const { getRoles } = await import('../util/database');

  const { getStyles } = await import('../util/database');
  const { getSchools } = await import('../util/database');

  // const rolesList = await getRoles();

  // const rolesNames = rolesList.map((roles) => ({
  //   value: roles.rolesName,
  //   label: roles.rolesName,
  // }));

  const stylesList = await getStyles();

  const names = stylesList.map((styles) => ({
    value: styles.name,
    label: styles.name,
  }));

  const schoolsList = await getSchools();

  const schoolsNames = schoolsList.map((schools) => ({
    value: schools.name,
    label: schools.name,
  }));

  // This code is linked to the respective join query in the database.
  // const { getStylesByDancer } = await import('../util/database');
  // const stylesList = await getStylesByDancer();

  return {
    props: {
      // rolesList: rolesNames,
      stylesList: names,
      schoolsList: schoolsNames,
      user: isValidUser,
    },
  };
}

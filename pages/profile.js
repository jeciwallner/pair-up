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
const gif = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: auto;
`;
const button = css`
  background-color: #499be7;
  padding: 0.5em;
  border-radius: 32px;
  border-color: #073162;
  color: #073162;
  font-size: 1em;
  width: 25em;
  max-width: 80vw;
  cursor: pointer;
  align-self: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  &:active {
    transform: scale(1.05);
  }
  &:hover {
    opacity: 0.6;
  }
`;

export default function Profile(props) {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - My Profile</title>
      </Head>
      <h3>Hello {props.user.username}!</h3>
      <p>
        So good, to see, that you want to dust off your dancing shoes and start
        moving your creaky bones!
        <br /> We are here to help you find you an awesome dance partner to
        share your passion and join in the fun! But first, please let us know,
        which Styles and Schools in Vienna you are particularly interested in,
        so we can help you better!
      </p>
      <form css={formStyles}>
        <p>What are you looking for?</p>
        <Select options={props.rolesList} />
        <br />
        <p>Chose your preferred dance styles.</p>
        <Select options={props.stylesList} isMulti />
        <br />
        <p>Choose your preferred dance schools.</p>
        <Select options={props.schoolsList} isMulti />
        <br />
        <button css={button}>Find a Dance Partner!</button>
      </form>
      <br />
      <img css={gif} src="/oldies.gif" alt="animated dancing couple" />
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

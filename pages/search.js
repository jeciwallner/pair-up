import Head from 'next/head';
import Layout from '../components/Layout';
import { getMatchingUser, getRoleById } from '../util/database';

export default function Profile(props) {
  // const [matches, setMatches] = useState();

  return (
    <Layout>
      <Head>
        <title>Pair Up! - My Search</title>
      </Head>
      <div className="container">
        <h1>The search commences....</h1>
        <p>{props.user.username}, now it's time match you up.</p>
        <form>
          <h2 className="mb-3">Let's find you a Dance Partner!</h2>
          <button
            className="btn btn-primary"
            onSubmit={async (event) => await event.preventDefault()}
          >
            Match my Preferences.
          </button>
        </form>
        <div>{JSON.stringify(props.partnerList)}</div>
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

  const getMyRole = await getRoleById(isValidUser.id);

  const theOtherRole = getMyRole[0].roleId;

  const getMatches = await getMatchingUser(theOtherRole);

  console.log('matches', getMatches);

  console.log('the other role', getMyRole[0].roleId);

  const partnerList = await getRoleById(getMatches[0].id);

  console.log('partnerlist', partnerList);

  return {
    props: {
      rolesList: rolesNames,
      user: isValidUser,
      partnerList: partnerList,
    },
  };
}

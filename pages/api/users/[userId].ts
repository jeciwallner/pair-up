import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../../util/cookie';
import {
  deleteUserById,
  getUser,
  getValidSessionByToken,
  updateUserById,
  User,
} from '../../../util/database';
import { SignUpResponse } from '../../api/sign_up';
import Profile from '../../profile';

export async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const user = await getUser(Number(req.query.userId));
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    console.log('query', req.query);
    const deletedUser = await deleteUserById(Number(req.query.userId));

    return res.status(200).json(deletedUser);
  } else if (req.method === 'PATCH') {
    const body = req.body;
    const query = req.query;

    const updatedUser = await updateUserById(Number(query.userId), {
      username: body.userName,
      email: body.email,
    });

    return res.status(200).json(updatedUser);
  }

  return res.status(405);
}

export async function handlerSignUpResponse(
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>,
) {
  if (req.method === 'GET') {
    const token = req.cookies.sessionToken;
    const session = await getValidSessionByToken(token);

    if (!session) {
      res.status(404).send({
        errors: [{ message: 'Not a valid Session' }],
      });
      return;
    }

    const user = (await getUser(session.userId)) as User | undefined;

    if (!user) {
      res.status(404).send({
        errors: [{ message: 'User not found' }],
      });
      return;
    }

    return res.status(200).send({ user: user });
  }
  return res.status(405);
}

type Props = {
  user: User;
  courses: Course[];
};

export default function SingleUser(props: Props) {
  // this is to get the url query in the frontend
  // const router = useRouter();
  // const { user } = router.query;

  const [following, setFollowing] = useState<FollowingItem[]>(
    getParsedCookie('following') || [],
  );

  const userCookieObject = following.find(
    (cookieObj) => cookieObj.id === props.user.id,
  );

  const initialClapCount = userCookieObject ? userCookieObject.clapCount : 0;

  const [clapCount, setClapCount] = useState(initialClapCount);

  function followClickHandler() {
    // 1. check the current state of the cookie
    const followingArray = getParsedCookie('following') || [];

    const newCookie = addOrRemoveFromFollowingArray(
      followingArray,
      props.user.id,
      () => setClapCount(0),
    );

    setParsedCookie('following', newCookie);
    setFollowing(newCookie);
  }

  function favouritesHandler() {
    // add 1 to the clap property
    // 1. get old version of the array
    const currentCookie = getParsedCookie('rhubarb') || [];
    // 2. get the object in the array
    const updatedUser = findUserAndSetFavourites(currentCookie, props.user.id);
    // 3. set the new version of the array
    setParsedCookie('rhubarb', currentCookie);
    setClapCount(updatedUser.clapCount);
  }

  return (
    <Layout>
      <Head>
        <title>My Profile</title>
      </Head>

      <div>Personal user page of {props.user.name || props.user.username}</div>

      <div>his/her favourite color is {props.user.favoriteColor}</div>

      <button onClick={followClickHandler}>
        {following.some((cookieObj) => props.user.id === cookieObj.id)
          ? 'unfollow'
          : 'follow'}
      </button>
      {following.some((cookieObj) => props.user.id === cookieObj.id) ? (
        <>
          <div>Clap: {clapCount}</div>
          <button onClick={clapClickHandler}>Clap me</button>
        </>
      ) : null}
      <h2>User Courses</h2>
      {props.courses.map((course) => {
        return (
          <div key={`course-${course.id}`}>
            <strong>{course.title}</strong>: {course.description}
          </div>
        );
      })}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUser, getCoursesByUserId } = await import(
    '../../../util/database'
  );

  const user = await getUser(Number(context.query.userId));
  const courses = await getCoursesByUserId(Number(context.query.userId));

  return {
    props: {
      user,
      courses,
    },
  };
}

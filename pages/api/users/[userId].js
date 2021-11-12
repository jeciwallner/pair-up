// localhost:3000/api/users/:id
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Head from 'next/head';
import { useState } from 'react';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  deleteUserById,
  getUser,
  updateUserById,
} from '../../../util/database';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import {
  addOrRemoveFromFollowingArray,
  findUserAndIncrementClapCount,
  getParsedCookie,
  setParsedCookie,
} from '../../util/cookies';
import {
  Course,
  getUser,
  getValidSessionByToken,
  User,
} from '../../util/database';
import { SignUpResponse } from './sign_up';

export default async function handler(req, res) {
  console.log('query', req.query);
  // console.log('body', req.body);
  // console.log('method', req.method);

  if (req.method === 'GET') {
    const user = await getUser(Number(req.query.userId));
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    console.log('query', req.query);
    // the code for the POST request
    const deletedUser = await deleteUserById(Number(req.query.userId));

    return res.status(200).json(deletedUser);
  } else if (req.method === 'PATCH') {
    const body = req.body;
    const query = req.query;

    const updatedUser = await updateUserById(Number(query.userId), {
      name: body.userName,
      favoriteColor: body.userColor,
    });

    return res.status(200).json(updatedUser);
  }

  return res.status(405);
}

export default async function handler(
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

type FollowingItem = { id: number; clapCount: number };

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

  // [5,7]
  // [{id: 5, clapCount:13}, {id: 7, clapCount:0} ]

  // const initialClapCount = following.find((cookieObj)=>cookieObj.id === props.user.id).clapCount

  const userCookieObject = following.find(
    (cookieObj) => cookieObj.id === props.user.id,
  );

  const initialClapCount = userCookieObject ? userCookieObject.clapCount : 0;

  const [clapCount, setClapCount] = useState(initialClapCount);

  function followClickHandler() {
    // 1. check the current state of the cookie
    const followingArray = getParsedCookie('following') || [];
    // [5,7]
    // [{id: 5, clapCount:13}, {id: 7, clapCount:0}]

    const newCookie = addOrRemoveFromFollowingArray(
      followingArray,
      props.user.id,
      () => setClapCount(0),
    );

    setParsedCookie('following', newCookie);
    setFollowing(newCookie);
  }

  function clapClickHandler() {
    // add 1 to the clap property
    // 1. get old version of the array
    const currentCookie = getParsedCookie('following') || [];
    // 2. get the object in the array
    const updatedUser = findUserAndIncrementClapCount(
      currentCookie,
      props.user.id,
    );
    // 3. set the new version of the array
    setParsedCookie('following', currentCookie);
    setClapCount(updatedUser.clapCount);
  }

  return (
    <Layout>
      <Head>
        <title>single user</title>
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
  const { getUser, getCoursesByUserId } = await import('../../util/database');

  const user = await getUser(Number(context.query.userId));
  const courses = await getCoursesByUserId(Number(context.query.userId));
  //  { id: '6', name: 'Andrea', favoriteColor: 'purple' },

  return {
    props: {
      user,
      courses,
    },
  };
}

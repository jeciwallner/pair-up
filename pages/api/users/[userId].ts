import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import Layout from '../../../components/Layout';
// import { getParsedCookie, setParsedCookie } from '../../../util/cookie';
import {
  deleteUserById,
  getUser,
  getValidSessionByToken,
  updateUserById,
  User,
} from '../../../util/database';
import { SignUpResponse } from '../../api/sign_up';

// import Profile from '../../profile';

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUser } = await import('../../../util/database');

  const user = await getUser(Number(context.query.userId));

  return {
    props: {
      user,
    },
  };
}

import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPassword } from '../../util/auth';
import { createSerializedSignUpSessionsTokenCookie } from '../../util/cookie';
import {
  createSession,
  deleteExpiredSessions,
  getUserWithPasswordHash,
  User,
} from '../../util/database';
import { Errors } from '../../util/types';

export type LoginResponse = { errors: Errors } | { user: User };

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Login requires Username and Password.' }],
    });
    return;
  }

  try {
    const username = req.body.username;
    const userWithPasswordHash = await getUserWithPasswordHash(username);

    if (!userWithPasswordHash) {
      res.status(401).send({
        errors: [{ message: 'Username or Password does not match.' }],
      });
      return;
    }

    const isPasswordVerified = await verifyPassword(
      req.body.password,
      userWithPasswordHash.passwordHash,
    );

    if (!isPasswordVerified) {
      res.status(401).send({
        errors: [{ message: 'Username or Password does not match.' }],
      });
      return;
    }

    deleteExpiredSessions();

    // token will be created on login!
    const token = crypto.randomBytes(64).toString('base64');

    const newSession = await createSession(token, userWithPasswordHash.id);

    const cookie = createSerializedSignUpSessionsTokenCookie(
      newSession.sessionToken,
    );

    const { passwordHash, ...user } = userWithPasswordHash;

    res.status(200).setHeader('set-Cookie', cookie).send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}

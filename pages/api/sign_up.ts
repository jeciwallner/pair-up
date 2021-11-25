import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import { createSerializedSignUpSessionsTokenCookie } from '../../util/cookie';
import { verifyCsrfToken } from '../../util/csrf';
import {
  createSession,
  deleteExpiredSessions,
  getUserWithPasswordHash,
  insertUser,
  User,
} from '../../util/database';
import { Errors } from '../../util/types';

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResponse = { errors: Errors } | { user: User };

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>,
) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Username and Password required.' }],
    });
    return;
  }

  if (!req.body.csrfToken || !verifyCsrfToken(req.body.csrfToken)) {
    res.status(400).send({
      errors: [{ message: 'Request does not contain valid token' }],
    });
    return;
  }

  if (req.body.password.length < 8) {
    res.status(400).send({
      errors: [{ message: ' Password is too short.' }],
    });
    return;
  }

  try {
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const existingUser = await getUserWithPasswordHash(username);

    if (existingUser) {
      res.status(400).send({
        errors: [{ message: 'Username already exists.' }],
      });
      return;
    }

    const passwordHash = await hashPassword(req.body.password);

    const user = await insertUser({
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      passwordHash: passwordHash,
    });

    deleteExpiredSessions();

    if (!user) {
      res.status(500).send({ errors: [{ message: 'User doesn`t exists' }] });
      return;
    }

    const token = crypto.randomBytes(64).toString('base64');

    const newSession = await createSession(token, user.id);

    const cookie = createSerializedSignUpSessionsTokenCookie(
      newSession.sessionToken,
    );

    res.status(200).setHeader('set-Cookie', cookie).send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}

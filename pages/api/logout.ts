import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteExpiredSessions,
  deleteSessionByToken,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    if (req.cookies.sessionToken) {
      await deleteSessionByToken(req.cookies.sessionToken);

      return res.status(200).send({});
    }
  }

  await deleteExpiredSessions();

  return res.status(405).send({});
}

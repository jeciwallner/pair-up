import { NextApiRequest, NextApiResponse } from 'next';
import { StorePreferencesResponse } from './profile';

export default async function preferencesHandler(
  req: NextApiRequest,
  res: NextApiResponse<StorePreferencesResponse>,
) {
  const formPreferences = req.body;
  const { getUserBySessionToken } = await import('../../util/database');
  const user = await getUserBySessionToken(req.cookies.sessionTokenSignUp);
  if (!user) {
    return;
  }

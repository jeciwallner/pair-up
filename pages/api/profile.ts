import { NextApiRequest, NextApiResponse } from 'next';
import {
  storeDancerRole,
  storeFavouriteSchools,
  storeFavouriteStyles,
} from '../../util/database';

export type StorePreferencesRequest = {
  role: number;
  styles: Array<number>;
  schools: Array<number>;
};
export type SelectOption = {
  value: number;
  label: string;
};

export type StorePreferencesResponse = {};

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

  await storeDancerRole(user.id, formPreferences.role.value);

  formPreferences.styles.forEach((style: SelectOption) => {
    storeFavouriteStyles(user.id, style.value);
  });
  formPreferences.schools.forEach((school: SelectOption) => {
    storeFavouriteSchools(user.id, school.value);
  });
  res.status(201);
}

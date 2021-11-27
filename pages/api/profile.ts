import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteFavouriteSchools,
  deleteFavouriteStyles,
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

  await deleteFavouriteStyles(user.id);
  await deleteFavouriteSchools(user.id);
  await storeDancerRole(user.id, formPreferences.role.value);

  formPreferences.styles.forEach(async (style: SelectOption) => {
    await storeFavouriteStyles(user.id, style.value);
  });
  formPreferences.schools.forEach(async (school: SelectOption) => {
    await storeFavouriteSchools(user.id, school.value);
  });

  res.status(201).send({});
}

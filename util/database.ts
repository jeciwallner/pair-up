import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './node-heroku-postgres-env-vars';

setPostgresDefaultsOnHeroku();

export type User = {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  sessionToken: string;
  userId: number;
  expiryTimestamp: Date;
};

export type Dancer = {
  id: number;
  roleId: number;
};

export type Role = {
  id: number;
  name: string;
};

export type FavouriteStyles = {
  dancerId: number;
  styleId: number;
};

export type FavouriteSchools = {
  dancerId: number;
  schoolId: number;
};

dotenvSafe.config();

declare module globalThis {
  let _postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

function connectOnceToDatabase() {
  let sql;
  if (process.env.NODE_ENV === 'production') {
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis._postgresSqlClient) {
      globalThis._postgresSqlClient = postgres();
    }
    sql = globalThis._postgresSqlClient;
  }
  return sql;
}

const sql = connectOnceToDatabase();

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      session_token  = ${token} AND
      expiry_timestamp > NOW()
  `;

  return session && camelcaseKeys(session);
}

export async function getSchools() {
  const schools = await sql`
SELECT * FROM schools;
`;
  return schools.map((school) => {
    return camelcaseKeys(school);
  });
}

export async function getStyles() {
  const styles = await sql`
SELECT * FROM styles;
 `;
  return styles.map((style) => {
    return camelcaseKeys(style);
  });
}

export async function getRoles() {
  const roles = await sql`
  SELECT * FROM roles;
  `;
  return roles.map((role) => {
    return camelcaseKeys(role);
  });
}

export async function getUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      username,
      email,
      phone_number,
      dancer_id
    FROM
      users;
  `;
  return users.map((user) => {
    // Convert snake case to camel case:
    return camelcaseKeys(user);
  });
}

export async function getUser(id: number) {
  const [user] = await sql<[User]>`
    SELECT
      id,
      username,
      email,
      phone_number,
      dancer_id
    FROM
      users
    WHERE
      id = ${id};
  `;
  return camelcaseKeys(user);
}

export async function getUserWithPasswordHash(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      username,
      email,
      phone_number,
      password_hash,
      dancer_id
    FROM
      users
    WHERE
      username = ${username};
  `;
  return user && camelcaseKeys(user);
}

export async function getUserBySessionToken(sessionToken: string | undefined) {
  if (!sessionToken) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username,
      users.email,
      users.phone_number,
      users.dancer_id
    FROM
      sessions,
      users
    WHERE
      sessions.session_token = ${sessionToken} AND
      sessions.user_id = users.id
  `;
  return user && camelcaseKeys(user);
}

export async function createUser({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [user] = await sql<[User | undefined]>`
    INSERT INTO users
      (name, email)
    VALUES
      (${name}, ${email})
    RETURNING
      id,
      username,
      email;
  `;
  return user && camelcaseKeys(user);
}

// The insert user function can't be called from the frontend: it needs an API Route that gives me an address that I can fetch using the Post method:
export async function insertUser({
  username,
  email,
  phoneNumber,
  passwordHash,
}: {
  username: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
}) {
  const [user] = await sql<[User | undefined]>`
    INSERT INTO users
      (username, email, phone_number, password_hash)
    VALUES
      (${username}, ${email}, ${phoneNumber}, ${passwordHash})
    RETURNING
      id,
      username,
      phone_number,
      email;
  `;
  return user && camelcaseKeys(user);
}

export async function updateUserById(
  id: number,
  {
    username,
    email,
  }: {
    username: string;
    email: string;
  },
) {
  const [user] = await sql<[User | undefined]>`
    UPDATE
      users
    SET
      username = ${username},
      email = ${email}
    WHERE
      id = ${id}
    RETURNING
      id,
      username,
      email;
  `;
  return user && camelcaseKeys(user);
}

export async function deleteUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING
      id,
      username,
      email;
  `;
  return user && camelcaseKeys(user);
}

export async function deleteFavouriteStyles(dancerId: number) {
  await sql`
    DELETE FROM
      favourite_styles
    WHERE
      dancer_id = ${dancerId}
  `;
}

export async function deleteFavouriteSchools(dancerId: number) {
  await sql`
    DELETE FROM
      favourite_schools
    WHERE
      dancer_id = ${dancerId}
  `;
}

export async function storeDancerRole(dancerId: number, roleId: number) {
  await sql`
  DELETE FROM
      dancers
    WHERE
      id = ${dancerId}
  `;
  const [dancer] = await sql<[Dancer]>`
    INSERT INTO
      dancers(role_id, id)
    VALUES
      (${roleId}, ${dancerId})
    RETURNING
      *
  `;
  return camelcaseKeys(dancer);
}

// userId is the same as dancerId
export async function storeFavouriteStyles(dancerId: number, styleId: number) {
  const [favouriteStyles] = await sql<[FavouriteStyles]>`
    INSERT INTO
      favourite_styles(dancer_id, style_id)
    VALUES
      (${dancerId}, ${styleId})
    RETURNING
      *
  `;
  return camelcaseKeys(favouriteStyles);
}

export async function storeFavouriteSchools(
  dancerId: number,
  schoolId: number,
) {
  const [favouriteSchools] = await sql<[FavouriteSchools]>`
    INSERT INTO
      favourite_schools(dancer_id, school_id)
    VALUES
      (${dancerId}, ${schoolId})
    RETURNING
      *
  `;
  return camelcaseKeys(favouriteSchools);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (session_token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;
  return camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session))[0];
}

// export async function getRoles() {
//   const roles = await sql`
//   SELECT * FROM roles;
//   `;
//   return roles.map((role) => {
//     return camelcaseKeys(role);
//   });
// }

export async function getMyRole(id: number) {
  const matches = await sql`
    SELECT
      *
    FROM
      dancers
    WHERE id = ${id}
  `;
  return matches.map((match) => camelcaseKeys(match));
}

export async function getOtherRole(role_id: number) {
  const matches = await sql`
    SELECT
      *
    FROM
      dancers
    WHERE role_id != ${role_id}
    `;
  return matches.map((match) => camelcaseKeys(match));
}

export async function getMatchingUser(myRoleId: number) {
  console.log(myRoleId);
  const matches = await sql`
    SELECT
      users.id,
      username,
      email,
      phone_number
    FROM
      dancers
    LEFT JOIN
      users
    ON
      dancers.id=users.id
    WHERE role_id != ${myRoleId}
  `;
  return matches.map((match) => camelcaseKeys(match));
}

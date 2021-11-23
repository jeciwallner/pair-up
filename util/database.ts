import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

module.exports = function setPostgresDefaultsOnHeroku() {
  if (process.env.DATABASE_URL) {
    const { parse } = require('pg-connection-string');

    // Extract the connection information from the Heroku environment variable
    const { host, database, user, password } = parse(process.env.DATABASE_URL);

    // Set standard environment variables
    process.env.PGHOST = host;
    process.env.PGDATABASE = database;
    process.env.PGUSERNAME = user;
    process.env.PGPASSWORD = password;
  }
};

export type User = {
  id: number;
  username: string;
  email: string;
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
  passwordHash,
}: {
  username: string;
  email: string;
  passwordHash: string;
}) {
  const [user] = await sql<[User | undefined]>`
    INSERT INTO users
      (username, email, password_hash)
    VALUES
      (${username}, ${email}, ${passwordHash})
    RETURNING
      id,
      username,
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

// Join query to get information from multiple tables:
// // WHAT ON EARTH IS THIS CODE DOING!??!??!?!
// // How can I make it work? (It's linked to the Profile and should show the chosen styles by user, I guess.)
// export async function getStylesByDancer(dancersId: number) {
//   const favouriteStylesByDancer = await sql`
//     SELECT
//       styles.id,
//       styles.name,
//       dancers.name
//     FROM
//       styles,
//       favourite_styles,
//       dancers
//     WHERE
//       dancers.id = dancers.id AND
//       dancers.id = favourite_styles.dancers_id AND
//       styles_id = favourite_styles.styles_id;
//   `;
//   return favouriteStylesByDancer.map((favourite_styles) =>
//     camelcaseKeys(favourite_styles),
//   );
// }

// export async function updateUserById(
//   id: number,
//   {
//     username,
//     email,
//   }: {
//     username: string;
//     email: string;
//   },
// ) {
//   const [user] = await sql<[User | undefined]>`
//     UPDATE
//       users
//     SET
//       username = ${username},
//       email = ${email}
//     WHERE
//       id = ${id}
//     RETURNING
//       id,
//       username,
//       email;
//   `;
//   return user && camelcaseKeys(user);
// }

// export async function deleteUserById(id: number) {
//   const [user] = await sql<[User | undefined]>`
//     DELETE FROM
//       users
//     WHERE
//       id = ${id}
//     RETURNING
//       id,
//       username,
//       email;
//   `;
//   return user && camelcaseKeys(user);
// }

// adapt above code so that user can update their preferences!

export async function deleteFavouriteStyles(dancerId: number, styleId: number) {
  await sql`
    DELETE FROM
      styles
    WHERE
      id = ${dancerId} && ${styleId}
  `;
}

export async function deleteFavouriteSchools(
  dancerId: number,
  schoolId: number,
) {
  await sql`
    DELETE FROM
      schools
    WHERE
      id = ${dancerId} && ${schoolId}
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

export async function getMatchingUser(id: number) {
  const matches = await sql`
    SELECT
      *
    FROM
      dancers
    WHERE role_id = ${id}
  `;
  return matches.map((match) => camelcaseKeys(match));
}

export async function getRoleById(id: number) {
  const matches = await sql`
    SELECT
      *
    FROM
      dancers
    WHERE role_id != ${id}
  `;
  return matches.map((match) => camelcaseKeys(match));
}

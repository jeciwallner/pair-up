// here in the database I need a hashed password; no passwords even close to the db!

import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

export type Course = {
  id: number;
  title: string;
  description: string;
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
  token: string;
  userId: number;
  expiryTimestamp: Date;
};

// Read in the environment variables
// in the .env file, making it possible
// to connect to PostgreSQL:
dotenvSafe.config();

// Type needed for the connection function!
declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When we're in development, make sure that we connect only
    // once to the database
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
// const sql = postgres();
const sql = connectOneTimeToDatabase();

// database query 1:
export async function getStyles() {
  const styles = await sql`
SELECT * FROM styles;
 `;
  return styles.map((style) => {
    return camelcaseKeys(style);
  });
}

// TODOs
// Connecting Database to Frontend
// * identify some page that will get some information from the database -> DONE
// * make sure that you can connect to the database from util/database.js (eg. with an .env file and dotenv-cli) -> DONE
// * write a database query for this information in util/database.js file (check the example repo for examples of SQL queries that could be adapted for your needs) -> DONE
// * import and run this query from the getServerSideProps on that page you identified (maybe take a look at the first / second databases lecture for how to do this)

export async function getUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      name,
      username
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
      name,
      favorite_color,
      username
    FROM
      users
    WHERE
      id = ${id};
  `;

  return camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      name,
      favorite_color,
      username,
      password_hash
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
      users.name,
      users.favorite_color,
      users.username
    FROM
      sessions,
      users
    WHERE
      sessions.token = ${sessionToken} AND
      sessions.user_id = users.id
  `;
  return user && camelcaseKeys(user);
}

export async function createUser({
  name,
  favoriteColor,
}: {
  name: string;
  favoriteColor: string;
}) {
  const [user] = await sql<[User | undefined]>`
    INSERT INTO users
      (name, favorite_color)
    VALUES
      (${name}, ${favoriteColor})
    RETURNING
      id,
      name,
      favorite_color;
  `;
  return user && camelcaseKeys(user);
}

export async function createUser2({
  name,
  favoriteColor,
}: {
  name: string;
  favoriteColor: string;
}) {
  const [user] = await sql<[User | undefined]>`
    INSERT INTO users2
      (name, favorite_color)
    VALUES
      (${name}, ${favoriteColor})
    RETURNING
      id,
      name,
      favorite_color;
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
    name,
    favoriteColor,
  }: {
    name: string;
    favoriteColor: string;
  },
) {
  const [user] = await sql<[User | undefined]>`
    UPDATE
      users
    SET
      name = ${name},
      favorite_color = ${favoriteColor}
    WHERE
      id = ${id}
    RETURNING
      id,
      name,
      favorite_color;
  `;
  return user && camelcaseKeys(user);
}

export async function updateUser2ById(
  id: number,
  {
    name,
    favoriteColor,
  }: {
    name: string;
    favoriteColor: string;
  },
) {
  const [user] = await sql<[User | undefined]>`
    UPDATE
      users2
    SET
      name = ${name},
      favorite_color = ${favoriteColor}
    WHERE
      id = ${id}
    RETURNING
      id,
      name,
      favorite_color;
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
      name,
      favorite_color;
  `;
  return user && camelcaseKeys(user);
}

export async function deleteUser2ById(id: number) {
  const [user] = await sql<[User | undefined]>`
    DELETE FROM
      users2
    WHERE
      id = ${id}
    RETURNING
      id,
      name,
      favorite_color;
  `;
  return user && camelcaseKeys(user);
}

// Join query to get information from multiple tables
export async function getCoursesByUserId(userId: number) {
  const courses = await sql<Course[]>`
    SELECT
      courses.id,
      courses.title,
      courses.description
    FROM
      users,
      users_courses,
      courses
    WHERE
      users.id = ${userId} AND
      users_courses.user_id = users.id AND
      courses.id = users_courses.course_id;
  `;
  return courses.map((course) => camelcaseKeys(course));
}

// Example of secure database function
export async function getCoursesByUserIdAndSessionToken(
  userId: number,
  sessionToken: string | undefined,
) {
  if (!sessionToken) return [];

  // Call another database function and then return early in case
  // the session doesn't exist
  //
  // This could be adapted for usage with an "admin" type role
  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    return [];
  }

  const courses = await sql<Course[]>`
    SELECT
      courses.id,
      courses.title,
      courses.description
    FROM
      users,
      users_courses,
      courses
    WHERE
      users.id = ${userId} AND
      users_courses.user_id = users.id AND
      courses.id = users_courses.course_id;
  `;
  return courses.map((course) => camelcaseKeys(course));
}

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > NOW()
  `;

  return session && camelcaseKeys(session);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
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

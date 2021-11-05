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
// to connect to PostgreSQL
dotenvSafe.config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;
  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an “unauthorized” certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When we’re in development, make sure that we connect only
    // once to the database
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }
  return sql;
}
// Connect to PostgreSQL
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

// The insert user function can't be called from the frontend: it needs an API Route that gives me an address that I can fetch using the Post method
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

// this will read in the environment variables in the .env file, making it possible to connect with postgres!
// dotenvSafe.config();

// const sql = postgres();

// export async function insertUser({ name, passwordHash,}
//   {
//   const [user] = await sql<[User]>`
//    INSERT INTO users(name, password_hash)
//    VALUES
//    (${name}, ${passwordHash})
//    RETURNING
//    id,
//    name,
//    email;
// }

// Connecting Database to Frontend
// * identify some page that will get some information from the database
// * make sure that you can connect to the database from util/database.js (eg. with an .env file and dotenv-cli) -> DONE
// * write a database query for this information in util/database.js file (check the example repo for examples of SQL queries that could be adapted for your needs)
// * import and run this query from the getServerSideProps on that page you identified (maybe take a look at the first / second databases lecture for how to do this)

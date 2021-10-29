// here in the database I need a hashed password; no passwords even close to the db!

import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

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

// this will read in the environment variables in the .env file, making it possible to connect with postgres!
// dotenvSafe.config();

// const sql = postgres();

// export async function insertUser({ name, hashPassword,}
//   {
//   const [user] = await sql<[User]>`
//    INSERT INTO users(name, hash_password)
//    VALUES
//    (${name}, ${hashPassword})
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

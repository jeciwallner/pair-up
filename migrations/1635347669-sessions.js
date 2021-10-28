exports.up = async function up(sql) {
  await sql`
	CREATE TABLE IF NOT EXISTS sessions (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		user_id integer NOT NULL references users (id) ON DELETE CASCADE ON UPDATE CASCADE,
		session_token varchar(90),
		expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours'
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE sessions;
	`;
};

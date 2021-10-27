exports.up = async function up(sql) {
  await sql`
	CREATE TABLE sessions (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		user_id integer references users (id),
		session_token varchar(60),
		expiry_timestamp timestamp
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE sessions;
	`;
};

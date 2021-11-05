exports.up = async function up(sql) {
  await sql`
	CREATE TABLE users (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		username varchar(40) UNIQUE NOT NULL,
		email varchar (40) NOT NULL,
		phone_number integer,
		password_hash varchar(60) NOT NULL,
		dancer_id integer references dancers (id)
	);
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE users;
	`;
};

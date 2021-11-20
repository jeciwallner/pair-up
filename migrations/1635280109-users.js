exports.up = async function up(sql) {
  await sql`
	CREATE TABLE users (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		username varchar(255) UNIQUE NOT NULL,
		email varchar (255) UNIQUE NOT NULL,
		phone_number varchar(60),
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

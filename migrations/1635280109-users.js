exports.up = async function up(sql) {
  await sql`
	CREATE TABLE users (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(40) NOT NULL,
		email varchar (40) NOT NULL,
		phone_number integer,
		hash_password varchar(60),
		dancer_id integer references dancers (id)
	);
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE users;
	`;
};

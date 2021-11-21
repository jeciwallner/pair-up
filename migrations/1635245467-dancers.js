exports.up = async function up(sql) {
  await sql`
	CREATE TABLE dancers (
		id integer PRIMARY KEY,
		role_id integer references roles (id)
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE dancers;
	`;
};

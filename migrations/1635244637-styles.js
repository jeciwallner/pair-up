// This will create the table
exports.up = async function up(sql) {
  await sql`
	CREATE TABLE styles (
		id integer PRIMARY KEY NOT NULL,
		name varchar(255) NOT NULL
		);
		`;
};

// This will remove the table
exports.down = async function down(sql) {
  await sql`
	DROP TABLE styles;
	`;
};

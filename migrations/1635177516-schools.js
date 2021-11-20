exports.up = async function up(sql) {
  console.log('Create schools table.');
  await sql`
	CREATE TABLE schools (
		id integer PRIMARY KEY NOT NULL,
		name varchar(255) NOT NULL
		);
		`;
};

// This will remove the table
exports.down = async function down(sql) {
  console.log('Drop schools table.');
  await sql`
	DROP TABLE schools;
	`;
};

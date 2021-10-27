// This will create the table
exports.up = async function up(sql) {
  console.log('Create styles table.');
  await sql`
	CREATE TABLE styles (
		id integer PRIMARY KEY NOT NULL,
		name varchar(40) NOT NULL
		);
		`;
};

// This will remove the table
exports.down = async function down(sql) {
  console.log('Drop styles table.');
  await sql`
	DROP TABLE styles;
	`;
};

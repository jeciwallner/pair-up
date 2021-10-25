exports.up = async function up(sql) {
  await sql`
	CREATE TABLE statuses (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(40) NOT NULL
);
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE statuses;
	`;
};

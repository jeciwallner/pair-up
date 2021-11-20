const roles = [
  { id: 1, name: 'Follower' },
  { id: 2, name: 'Leader' },
];

exports.up = async function up(sql) {
  await sql`
	CREATE TABLE roles (
  id integer PRIMARY KEY,
  name varchar(255) NOT NULL
 );
 `;
  await sql`
	INSERT INTO roles ${sql(roles, 'id', 'name')}
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE roles;
	`;
};

const roles = [
  { id: 1, name: 'Follower' },
  { id: 2, name: 'Leader' },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO roles ${sql(roles, 'id', 'name')}
	`;
};

exports.down = async function down(sql) {
  for (const role of roles) {
    await sql`
	DELETE FROM
		roles
	WHERE
		id = ${role.id} AND name = ${role.name};
	`;
  }
};

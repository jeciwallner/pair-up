exports.up = async function up(sql) {
  await sql`
	INSERT INTO roles
	(name)
VALUES
	( 'Follower'),
	( 'Leader');
	`;
};

exports.down = async function down(sql) {
  await sql`
	DELETE FROM
		roles
	WHERE
		( name = 'Follower') OR
	  ( name = 'Leader');
	`;
};

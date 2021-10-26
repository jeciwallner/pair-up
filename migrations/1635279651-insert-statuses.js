exports.up = async function up(sql) {
  await sql`
	INSERT INTO statuses
	(name)
VALUES
	( 'Accepted'),
	( 'Declined'),
	( 'Pending');
	`;
};

exports.down = async function down(sql) {
  await sql`
	DELETE FROM
		statuses
	WHERE
		( name = 'Accepted') OR
	  ( name = 'Declined') OR
		( name = 'Pending');
	`;
};

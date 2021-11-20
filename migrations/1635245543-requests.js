exports.up = async function up(sql) {
  await sql`
	CREATE TABLE requests (
		PRIMARY KEY (requester_id, receiver_id),
		requester_id integer references dancers (id),
		receiver_id integer references dancers (id),
		created_at timestamp NOT NULL DEFAULT NOW(),
		accepted_at timestamp,
		declined_at timestamp
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE requests;
	`;
};

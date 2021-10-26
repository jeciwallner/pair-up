exports.up = async function up(sql) {
  await sql`
	CREATE TABLE requests (
		PRIMARY KEY (requester_id, receiver_id),
		requester_id integer references dancers (id),
		receiver_id integer references dancers (id),
		point_in_time timestamp,
		status_id integer references statuses (id)
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE requests;
	`;
};

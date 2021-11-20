exports.up = async function up(sql) {
  await sql`
  CREATE TABLE favourite_schools (
    PRIMARY KEY (dancer_id, school_id),
    dancer_id integer references dancers (id),
    school_id integer references schools (id)
  );
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE favourite_schools;
	`;
};

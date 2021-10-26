exports.up = async function up(sql) {
  await sql`
CREATE TABLE favourite_schools (
  PRIMARY KEY (dancers_id, schools_id),
  dancers_id integer references dancers (id),
  schools_id integer references schools (id)
);
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE favourite_schools;
	`;
};

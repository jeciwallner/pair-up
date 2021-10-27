exports.up = async function up(sql) {
  await sql`
CREATE TABLE styles_schools (
  PRIMARY KEY (styles_id, schools_id),
  styles_id integer references styles (id),
  schools_id integer references schools (id)
);
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE styles_schools;
	`;
};

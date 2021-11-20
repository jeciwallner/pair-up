exports.up = async function up(sql) {
  await sql`
  CREATE TABLE styles_schools (
    PRIMARY KEY (style_id, school_id),
    style_id integer references styles (id),
    school_id integer references schools (id)
  );
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE styles_schools;
	`;
};

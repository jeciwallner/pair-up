exports.up = async function up(sql) {
  await sql`
  CREATE TABLE favourite_styles (
    PRIMARY KEY (dancer_id, style_id),
    dancer_id integer references dancers (id),
    style_id integer references styles (id)
  );
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE favourite_styles;
	`;
};

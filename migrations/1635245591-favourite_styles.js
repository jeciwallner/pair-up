exports.up = async function up(sql) {
  await sql`
CREATE TABLE favourite_styles (
  PRIMARY KEY (dancers_id, styles_id),
  dancers_id integer references dancers (id),
  styles_id integer references styles (id)
);
`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE favourite_styles;
	`;
};

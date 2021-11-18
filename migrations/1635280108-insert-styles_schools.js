const styles_schools = [
  { schools_id: 1, styles_id: 1 },
  { schools_id: 1, styles_id: 2 },
  { schools_id: 1, styles_id: 3 },
  { schools_id: 2, styles_id: 1 },
  { schools_id: 2, styles_id: 3 },
  { schools_id: 3, styles_id: 2 },
  { schools_id: 4, styles_id: 3 },
  { schools_id: 5, styles_id: 4 },
  { schools_id: 5, styles_id: 5 },
  { schools_id: 5, styles_id: 6 },
  { schools_id: 6, styles_id: 5 },
  { schools_id: 7, styles_id: 8 },
  { schools_id: 8, styles_id: 16 },
  { schools_id: 9, styles_id: 17 },
  { schools_id: 10, styles_id: 14 },
  { schools_id: 11, styles_id: 7 },
  { schools_id: 11, styles_id: 8 },
  { schools_id: 11, styles_id: 9 },
  { schools_id: 11, styles_id: 10 },
  { schools_id: 11, styles_id: 11 },
  { schools_id: 11, styles_id: 12 },
  { schools_id: 11, styles_id: 13 },
  { schools_id: 11, styles_id: 14 },
  { schools_id: 11, styles_id: 15 },
  { schools_id: 11, styles_id: 16 },
  { schools_id: 11, styles_id: 17 },
  { schools_id: 11, styles_id: 18 },
  { schools_id: 12, styles_id: 7 },
  { schools_id: 12, styles_id: 10 },
  { schools_id: 12, styles_id: 11 },
  { schools_id: 12, styles_id: 14 },
  { schools_id: 12, styles_id: 19 },
  { schools_id: 13, styles_id: 9 },
  { schools_id: 14, styles_id: 10 },
  { schools_id: 15, styles_id: 11 },
  { schools_id: 16, styles_id: 12 },
  { schools_id: 17, styles_id: 12 },
  { schools_id: 18, styles_id: 12 },
  { schools_id: 19, styles_id: 10 },
  { schools_id: 20, styles_id: 9 },
  { schools_id: 21, styles_id: 7 },
  { schools_id: 22, styles_id: 7 },
  { schools_id: 23, styles_id: 15 },
  { schools_id: 24, styles_id: 16 },
  { schools_id: 25, styles_id: 17 },
  { schools_id: 26, styles_id: 19 },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO styles_schools ${sql(styles_schools, 'schools_id', 'styles_id')}
	`;
};

exports.down = async function down(sql) {
  for (const schoolStyles of styles_schools) {
    await sql`
	DELETE FROM
styles_schools
WHERE
schools_id = ${schoolStyles.schools_id} AND styles_id = ${schoolStyles.styles_id};
 `;
  }
};

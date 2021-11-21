const styles_schools = [
  { school_id: 1, style_id: 1 },
  { school_id: 1, style_id: 2 },
  { school_id: 1, style_id: 3 },
  { school_id: 2, style_id: 1 },
  { school_id: 2, style_id: 3 },
  { school_id: 3, style_id: 2 },
  { school_id: 4, style_id: 3 },
  { school_id: 5, style_id: 4 },
  { school_id: 5, style_id: 5 },
  { school_id: 5, style_id: 6 },
  { school_id: 6, style_id: 5 },
  { school_id: 7, style_id: 8 },
  { school_id: 8, style_id: 16 },
  { school_id: 9, style_id: 17 },
  { school_id: 10, style_id: 14 },
  { school_id: 11, style_id: 7 },
  { school_id: 11, style_id: 8 },
  { school_id: 11, style_id: 9 },
  { school_id: 11, style_id: 10 },
  { school_id: 11, style_id: 11 },
  { school_id: 11, style_id: 12 },
  { school_id: 11, style_id: 13 },
  { school_id: 11, style_id: 14 },
  { school_id: 11, style_id: 15 },
  { school_id: 11, style_id: 16 },
  { school_id: 11, style_id: 17 },
  { school_id: 11, style_id: 18 },
  { school_id: 12, style_id: 7 },
  { school_id: 12, style_id: 10 },
  { school_id: 12, style_id: 11 },
  { school_id: 12, style_id: 14 },
  { school_id: 12, style_id: 19 },
  { school_id: 13, style_id: 9 },
  { school_id: 14, style_id: 10 },
  { school_id: 15, style_id: 11 },
  { school_id: 16, style_id: 12 },
  { school_id: 17, style_id: 12 },
  { school_id: 18, style_id: 12 },
  { school_id: 19, style_id: 10 },
  { school_id: 20, style_id: 9 },
  { school_id: 21, style_id: 7 },
  { school_id: 22, style_id: 7 },
  { school_id: 23, style_id: 15 },
  { school_id: 24, style_id: 16 },
  { school_id: 25, style_id: 17 },
  { school_id: 26, style_id: 19 },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO styles_schools ${sql(styles_schools, 'school_id', 'style_id')}
	`;
};

exports.down = async function down(sql) {
  for (const schoolStyles of styles_schools) {
    await sql`
	DELETE FROM
styles_schools
WHERE
school_id = ${schoolStyles.school_id} AND style_id = ${schoolStyles.style_id};
 `;
  }
};

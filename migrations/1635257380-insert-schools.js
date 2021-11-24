const schools = [
  { id: 1, name: 'SwingAUT' },
  { id: 2, name: 'Swing.Wien' },
  { id: 3, name: 'Step & Swing' },
  { id: 4, name: 'IG Hop' },
  { id: 5, name: 'MyDanceVienna' },
  { id: 6, name: 'Apollo 21 Tanzstudio' },
  { id: 7, name: 'Tanzschule Chris' },
  { id: 8, name: 'Tanzschule Dance for Fun' },
  { id: 9, name: 'Tanzschule Dorner' },
  { id: 10, name: 'Tanzschule Eddy Franzen' },
  { id: 11, name: 'Tanzschule Elmayer' },
  { id: 12, name: 'Tanzschule Fred Astaire' },
  { id: 13, name: 'Tanzschule Immervoll' },
  { id: 14, name: 'Tanzschule Kopetzky' },
  { id: 15, name: 'Tanzschule Kraml 1010' },
  { id: 16, name: 'Tanzschule Kraml 1030' },
  { id: 17, name: 'Tanzschule Kraml 1070' },
  { id: 18, name: 'Tanzschule Kreuzenstein' },
  { id: 19, name: 'Tanzschule Lamp' },
  { id: 20, name: 'Tanzschule Mikl' },
  { id: 21, name: 'Tanzschule Mühlsiegl' },
  { id: 22, name: 'Tanzschule Prof. Wagner' },
  { id: 23, name: 'Tanzschule Rueff' },
  { id: 24, name: 'Tanzschule Schwebach' },
  { id: 25, name: 'Tanzschule Stanek' },
  { id: 26, name: 'Tanzschule Step & Swing - Die Tanzprofis' },
];

// Alternative shortcut from Postgres.js (multiple inserts into one query) - needs to match exactly what's in the db!
exports.up = async function up(sql) {
  await sql`
	INSERT INTO schools ${sql(schools, 'id', 'name')}
	`;
};

exports.down = async function down(sql) {
  await sql`
    DELETE FROM
     favourite_schools
  `;
  await sql`
    DELETE FROM
     schools
	`;
};

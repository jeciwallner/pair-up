const styles = [
  { name: 'Swing' },
  { name: 'Charleston' },
  { name: 'Lindy Hop' },
  { name: 'Bachata' },
  { name: 'Salsa' },
  { name: 'Kizomba' },
  { name: 'Viennese Waltz' },
  { name: 'Slow Waltz' },
  { name: 'Foxtrott' },
  { name: 'Quickstepp' },
  { name: 'Tango' },
  { name: 'Cha Cha Cha' },
  { name: 'Square Rumba' },
  { name: 'Cuban Rumba' },
  { name: 'Samba' },
  { name: 'Boogie' },
  { name: 'Jive' },
  { name: 'Paso Doble' },
  { name: 'Ball Season Crash Course' },
];

exports.up = async function up(sql) {
  console.log('inserting styles into table');

  // Looping over the array and INSERTing each style
  for (const style of styles) {
    await sql`
  	INSERT INTO styles
  		(name)
  	VALUES
  		(${style.name});
  	`;
  }
};

// Alternative shortcut from Postgres.js (multiple inserts into one query) - needs to match exactly what's in the db!
//   await sql`
// INSERT INTO styles ${sql(styles, 'name')}
// `;
// };

exports.down = async function down(sql) {
  console.log('I have deleted the styles table.');
  for (const style of styles) {
    await sql`
DELETE FROM
 styles
WHERE
 name = ${style.name};
	`;
  }
};

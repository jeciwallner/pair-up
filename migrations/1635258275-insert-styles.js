const styles = [
  { id: 1, name: 'Swing' },
  { id: 2, name: 'Charleston' },
  { id: 3, name: 'Lindy Hop' },
  { id: 4, name: 'Bachata' },
  { id: 5, name: 'Salsa' },
  { id: 6, name: 'Kizomba' },
  { id: 7, name: 'Viennese Waltz' },
  { id: 8, name: 'Slow Waltz' },
  { id: 9, name: 'Foxtrott' },
  { id: 10, name: 'Quickstepp' },
  { id: 11, name: 'Tango' },
  { id: 12, name: 'Cha Cha Cha' },
  { id: 13, name: 'Square Rumba' },
  { id: 14, name: 'Cuban Rumba' },
  { id: 15, name: 'Samba' },
  { id: 16, name: 'Boogie' },
  { id: 17, name: 'Jive' },
  { id: 18, name: 'Paso Doble' },
  { id: 19, name: 'Ball Season Crash Course' },
];

exports.up = async function up(sql) {
  // Looping over the array and INSERTing each style
  for (const style of styles) {
    await sql`
  	INSERT INTO styles
  		(id, name)
  	VALUES
  		(${style.id}, ${style.name});
  	`;
  }
};

exports.down = async function down(sql) {
  for (const style of styles) {
    await sql`
DELETE FROM
 styles
WHERE
id = ${style.id};
	`;
  }
};

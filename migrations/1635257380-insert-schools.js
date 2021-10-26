exports.up = async function up(sql) {
  await sql`
	INSERT INTO schools
	(name)
VALUES
	( 'SwingAUT'),
	( 'Swing.Wien'),
	( 'Step & Swing'),
	( 'IG Hop'),
	( 'MyDanceVienna'),
	( 'Apollo 21 Tanzstudio'),
	( 'Tanzschule Chris'),
	( 'Tanzschule Dance for Fun'),
	( 'Tanzschule Dorner'),
	( 'Tanzschule Eddy Franzen'),
	( 'Tanzschule Elmayer'),
	( 'Tanzschule Fred Astaire'),
	( 'Tanzschule Immervoll'),
	( 'Tanzschule Kopetzky'),
	( 'Tanzschule Kraml 1010'),
	( 'Tanzschule Kraml 1030'),
	( 'Tanzschule Kraml 1070'),
	( 'Tanzschule Kreuzenstein'),
	( 'Tanzschule Lamp'),
	( 'Tanzschule Mikl'),
	( 'Tanzschule Mühlsiegl'),
	( 'Tanzschule Prof. Wagner'),
	( 'Tanzschule Rueff'),
	( 'Tanzschule Schwebach'),
	( 'Tanzschule Stanek'),
	( 'Tanzschule Step & Swing - Die Tanzprofis');
	`;
};

exports.down = async function down(sql) {
  await sql`
	DELETE FROM
		schools
	WHERE
		( name = 'SwingAUT') OR
	  ( name = 'Swing.Wien') OR
		( name = 'Step & Swing') OR
		( name = 'IG Hop') OR
		( name = 'MyDanceVienna') OR
		( name = 'Apollo 21 Tanzstudio') OR
		( name = 'Tanzschule Chris') OR
		( name = 'Tanzschule Dance for Fun') OR
		( name = 'Tanzschule Dorner') OR
		( name = 'Tanzschule Eddy Franzen') OR
		( name = 'Tanzschule Elmayer') OR
		( name = 'Tanzschule Fred Astaire') OR
		( name = 'Tanzschule Immervoll') OR
		( name = 'Tanzschule Kopetzky') OR
		( name = 'Tanzschule Kraml 1010') OR
		( name = 'Tanzschule Kraml 1030') OR
		( name = 'Tanzschule Kraml 1070') OR
		( name = 'Tanzschule Kreuzenstein') OR
		( name = 'Tanzschule Lamp') OR
		( name = 'Tanzschule Mikl') OR
		( name = 'Tanzschule Mühlsiegl') OR
		( name = 'Tanzschule Prof. Wagner') OR
		( name = 'Tanzschule Rueff') OR
		( name = 'Tanzschule Schwebach') OR
		( name = 'Tanzschule Stanek') OR
		( name = 'Tanzschule Step & Swing - Die Tanzprofis');
	`;
};

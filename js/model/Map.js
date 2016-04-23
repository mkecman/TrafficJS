var Map =
{
	name: "testMap",
	model: {},
	setup( width, height )
	{
		let total = 0;
		for( var indexWidth = 0; indexWidth < width; indexWidth++ ) 
		{
			this.model[ indexWidth ] = {};
			for( var indexHeight = 0; indexHeight < height; indexHeight++ )
			{
				this.model[ indexWidth ][ indexHeight ] = MapCellFactory( { id: total, x: indexWidth, y: indexHeight, type: MapCellType.BLOCK } );
				total++;
			}
		}
	}
}
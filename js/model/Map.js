var Map =
{
	name: "testMap",
	sizeX: 30,
	sizeY: 30,
	cell: 
	{
		offset: 1,
		size: 10,
		fill: true
	},
	cells: {},
	lightsMapCells: [],
	startMapCells: [],
	endMapCells: [],
	getPixelPosition( x, y )
	{
		var point = { x:0, y:0 };
		point.x = ( x * this.cell.size ) + ( x * this.cell.offset );
		point.y = ( y * this.cell.size ) + ( y * this.cell.offset );
		return point;
	},
	canMoveFromCell( x, y, direction )
	{
		var targetCell = this.cells[ x ][ y ];
		for (var i = 0; i < targetCell.directions.length; i++) 
		{
			if( direction.length == 1 && direction == targetCell.directions[i].substr( 1 ) )
			{
				return true;
			}
			if( direction == targetCell.directions[i] )
				return true;
		}

		return false;
	},
	canEnterCellRealTime( x, y )
	{
		if( this.cells[ x ][ y ].occupied || this.cells[ x ][ y ].stopLight )
			return false;

		return true;
	},
	findMapCells()
	{
		this.startMapCells = [];
		this.endMapCells = [];
		this.lightsMapCells = [];

		for (var x = 0; x < this.sizeX; x++) 
		{
			for (var y = 0; y < this.sizeY; y++) 
			{
				if( this.cells[ x ][ y ].type == MapCellType.START )
				{
					this.startMapCells.push( { x: x, y: y } );
				}
				if( this.cells[ x ][ y ].type == MapCellType.END )
				{
					this.endMapCells.push( { x: x, y: y } );
				}
				if( this.cells[ x ][ y ].type == MapCellType.LIGHT )
				{
					this.lightsMapCells.push( { x: x, y: y } );
				}
			}
		}
	}
}
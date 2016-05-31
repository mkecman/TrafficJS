var MapController = 
{
	map: Map,
	crossroadController: CrossRoadController,
	getPixelPosition( x, y )
	{
		var point = { x:0, y:0 };
		point.x = ( x * this.map.cell.size ) + ( x * this.map.cell.offset );
		point.y = ( y * this.map.cell.size ) + ( y * this.map.cell.offset );
		return point;
	},
	canMoveFromCell( x, y, direction )
	{
		var targetCell = this.map.cells[ x ][ y ];
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
	canEnterCellRealTime( oldX, oldY, newX, newY )
	{
		var oldCell = this.map.cells[ oldX ][ oldY ];
		var newCell = this.map.cells[ newX ][ newY ];
		if( newCell.type == MapCellType.CROSSROAD && oldCell.type != MapCellType.CROSSROAD )
		{
			if( !this.crossroadController.isCrossRoadPassable( newCell.crossroadId ) )
				return false;
		}

		if( newCell.occupied || newCell.stopLight )
			return false;

		return true;
	},
	findMapCells()
	{
		this.map.startMapCells = [];
		this.map.endMapCells = [];
		this.map.lightsMapCells = [];
		this.map.crossroadsMapCells = {};

		var cell;
		for (var x = 0; x < this.map.sizeX; x++) 
		{
			for (var y = 0; y < this.map.sizeY; y++) 
			{
				cell = this.map.cells[ x ][ y ];
				if( cell.type == MapCellType.START )
				{
					this.map.startMapCells.push( { x: x, y: y } );
				}
				if( cell.type == MapCellType.END )
				{
					this.map.endMapCells.push( { x: x, y: y } );
				}
				if( cell.type == MapCellType.LIGHT )
				{
					this.map.lightsMapCells.push( { x: x, y: y } );
				}
				if( cell.type == MapCellType.CROSSROAD )
				{
					if( this.map.crossroadsMapCells[ cell.crossroadId ] == null )
						this.map.crossroadsMapCells[ cell.crossroadId ] = [];
					
					this.map.crossroadsMapCells[ cell.crossroadId ].push( cell );
				}
			}
		}
	}
}
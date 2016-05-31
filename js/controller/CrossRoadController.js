var CrossRoadController = 
{
	map: Map,
	isCrossRoadPassable( id )
	{
		var cells = this.map.crossroadsMapCells[ id ];
		var length = cells.length;
		var occupied = 0;
		for( var i = 0; i < length; i++ )
		{
			if( cells[ i ].occupied )
				occupied++;
		}

		if( occupied >= cells[ 0 ].maxCars )
		{
			return false;
		}

		return true;
	}
}
var LightsController = 
{
	map: Map,
	init()
	{
		for (var i = 0; i < this.map.lightsMapCells.length; i++) 
		{
			var lightPoint = this.map.lightsMapCells[i];
			var light = this.map.cells[ lightPoint.x ][ lightPoint.y ];
			light.tick = light.startIndex;
			light.pattern = [];
			for (var lightIndex = 0; lightIndex < light.redDuration; lightIndex++) 
				light.pattern.push( "red" );
			for (lightIndex = 0; lightIndex < light.greenDuration; lightIndex++) 
				light.pattern.push( "green" );
		}
	},
	update()
	{
		for (var i = 0; i < this.map.lightsMapCells.length; i++) 
		{
			var lightPoint = this.map.lightsMapCells[i];
			var light = this.map.cells[ lightPoint.x ][ lightPoint.y ];
			
			if( light.pattern[ light.tick ] == "green" )
				light.stopLight = false;
			
			if( light.pattern[ light.tick ] == "red" )
				light.stopLight = true;

			if( light.stopLight )
				light.color = light.redColor;
			else
				light.color = light.greenColor;

			light.tick++;

			if( light.tick >= light.pattern.length )
			{
				light.tick = 0;
			}
		}
	}
}
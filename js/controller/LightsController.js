var LightsController = 
{
	map: Map,
	update()
	{
		for (var i = 0; i < this.map.lightsMapCells.length; i++) 
		{
			var lightPoint = this.map.lightsMapCells[i];
			var light = this.map.cells[ lightPoint.x ][ lightPoint.y ];
			this.updateLight( light, lightPoint );

			if( light.greenTick >= light.greenDuration )
			{
				light.occupied = true;
				light.greenTick = 0;
			}
			if( light.redTick >= light.redDuration )
			{
				light.occupied = false;
				light.redTick = 0;
			}
		}
	},
	updateLight( light, point )
	{
		if( light.occupied )
		{
			light.redTick++;
			light.color = light.redColor;
		}
		else
		{
			light.greenTick++;
			light.color = light.greenColor;
		}
	}
}
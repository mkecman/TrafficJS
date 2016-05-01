var LightsController = 
{
	map: Map,
	init()
	{
		for (var i = 0; i < this.map.lightsMapCells.length; i++) 
		{
			var lightPoint = this.map.lightsMapCells[i];
			var light = this.map.cells[ lightPoint.x ][ lightPoint.y ];
			
		}
	},
	update()
	{
		for (var i = 0; i < this.map.lightsMapCells.length; i++) 
		{
			var lightPoint = this.map.lightsMapCells[i];
			var light = this.map.cells[ lightPoint.x ][ lightPoint.y ];
			if( light.delayTick > 0 )
			{
				light.delayTick--;
				continue;
			}

			this.updateLight( light, lightPoint );
			if( light.greenTick >= light.greenDuration )
			{
				light.stopLight = true;
				light.greenTick = 0;
			}
			if( light.redTick >= light.redDuration )
			{
				light.stopLight = false;
				light.redTick = 0;
			}
		}
	},
	updateLight( light, point )
	{
		if( light.stopLight )
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
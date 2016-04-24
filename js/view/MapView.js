var MapView = 
{
	canvas: null,
	ctx: null,
	model: null,
	init( canvas )
	{
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		//this.width = window.innerWidth;
		//this.height = window.innerHeight;
		this.width = MapConfig.map.sizeX * MapConfig.cell.size + MapConfig.map.sizeX * MapConfig.cell.offset;
		this.height = MapConfig.map.sizeY * MapConfig.cell.size + MapConfig.map.sizeY * MapConfig.cell.offset;
		this.ctx.width  = this.width;
		this.ctx.height = this.height;
		this.ctx.canvas.width  = this.width;
		this.ctx.canvas.height = this.height;

		MapCellViewFactory.setup( MapCellType );
	},
	draw( map, width, height )
	{
		this.ctx.clearRect( 0, 0, this.width, this.height );
		for( var x = 0; x < width; x++ )
		{
			for( var y = 0; y < height; y++ )
			{
				var cell = MapCellViewFactory.model[ map.model[ x ][ y ].type ];
				this.ctx.drawImage( cell.canvas, ( x * cell.model.size ) + ( x * MapConfig.cell.offset ), ( y * cell.model.size ) + ( y * MapConfig.cell.offset ) );
			}
		}
	}
}
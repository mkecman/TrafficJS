var MapView = 
{
	canvas: null,
	ctx: null,
	model: null,
	init( canvas )
	{
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.ctx.width  = this.width;
		this.ctx.height = this.height;
		this.ctx.canvas.width  = this.width;
		this.ctx.canvas.height = this.height;

		MapCellViewFactory.setup( MapCellType );
	},
	draw( model, width, height )
	{
		for( var x = 0; x < width; x++ )
		{
			for( var y = 0; y < height; y++ )
			{
				var cell = MapCellViewFactory.model[ model[ x ][ y ].type ];
				this.ctx.drawImage( cell.canvas, x * cell.model.size, y * cell.model.size );
			}
		}
	}
}
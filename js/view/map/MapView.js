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
		this.width = Map.sizeX * Map.cell.size + Map.sizeX * Map.cell.offset;
		this.height = Map.sizeY * Map.cell.size + Map.sizeY * Map.cell.offset;
		this.ctx.width  = this.width;
		this.ctx.height = this.height;
		this.ctx.canvas.width  = this.width;
		this.ctx.canvas.height = this.height;

		MapCellViewFactory.setup( MapCellType );
	},
	draw( map )
	{
		this.ctx.clearRect( 0, 0, this.width, this.height );
		for( var x = 0; x < map.sizeX; x++ )
		{
			for( var y = 0; y < map.sizeY; y++ )
			{
				var cell = MapCellViewFactory.update( map.cells[ x ][ y ] );
				this.ctx.drawImage( cell.canvas, ( x * cell.model.size ) + ( x * map.cell.offset ), ( y * cell.model.size ) + ( y * map.cell.offset ) );
			}
		}
	}
}
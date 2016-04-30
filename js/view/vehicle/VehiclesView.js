var VehiclesView = 
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

		VehicleViewFactory.setup( VehicleType );
	},
	draw( vehicles )
	{
		this.ctx.clearRect( 0, 0, this.width, this.height );
		for (var i = 0; i < vehicles.length; i++) 
		{
			var cell = VehicleViewFactory.update( vehicles[ i ] );
			this.ctx.drawImage( cell.canvas, cell.model.x, cell.model.y );
		}
	}
}
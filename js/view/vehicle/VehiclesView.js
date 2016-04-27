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
		this.width = MapConfig.map.sizeX * MapConfig.cell.size + MapConfig.map.sizeX * MapConfig.cell.offset;
		this.height = MapConfig.map.sizeY * MapConfig.cell.size + MapConfig.map.sizeY * MapConfig.cell.offset;
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
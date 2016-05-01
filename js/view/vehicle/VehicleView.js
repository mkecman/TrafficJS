var VehicleView = 
{
	canvas: null,
	ctx: null,
	model: null,
	init( model )
	{
		this.canvas = document.createElement('canvas');
		this.canvas.width = Map.cell.size;
		this.canvas.height = Map.cell.size;
		this.ctx = this.canvas.getContext("2d");
		this.model = model;
		this.draw();
	},
	draw()
	{
		this.clear();
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.model.color;
		this.ctx.fillStyle = this.model.color;
		
		//if( this.model.fill )
		var center = ( Map.cell.size / 2 ) - ( this.model.sizeX / 2 );
			this.ctx.fillRect( center, 0, this.model.sizeX, this.model.sizeY );
		//else
		//	this.ctx.strokeRect( 0, 0, this.model.sizeX, this.model.sizeY );
	},
	update( cellModel )
	{
		alert('Implement in sub-class!');
	},
	clear()
	{
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
	}
}
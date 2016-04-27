var MapCellView = 
{
	canvas: null,
	ctx: null,
	model: null,
	init( model )
	{
		this.canvas = document.createElement('canvas');
		this.canvas.width = model.size;
		this.canvas.height = model.size;
		this.ctx = this.canvas.getContext("2d");
		this.model = model;
		this.draw();
	},
	draw()
	{
		this.clear();
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.model.model.color;
		this.ctx.fillStyle = this.model.model.color;
		
		if( this.model.fill )
			this.ctx.fillRect( 0, 0, this.model.size, this.model.size );
		else
			this.ctx.strokeRect( 0, 0, this.model.size, this.model.size );
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
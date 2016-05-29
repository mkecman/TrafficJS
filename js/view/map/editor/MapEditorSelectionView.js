var MapEditorSelectionView = 
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
	},
	draw( startCell, endCell )
	{
		this.ctx.clearRect( 0, 0, this.width, this.height );
		
		this.ctx.beginPath();
		this.ctx.fillStyle = "rgba(0,0,255,0.2)";
		
		var sx = startCell.x * Map.cell.size + startCell.x * Map.cell.offset;
		var sy = startCell.y * Map.cell.size + startCell.y * Map.cell.offset;
		var ex = endCell.x * Map.cell.size + endCell.x * Map.cell.offset;
		var ey = endCell.y * Map.cell.size + endCell.y * Map.cell.offset;

		this.ctx.fillRect( sx, sy, ex - sx, ey - sy );
	}
}
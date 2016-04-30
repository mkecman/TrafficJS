var Map =
{
	name: "testMap",
	sizeX: 30,
	sizeY: 30,
	cell: 
	{
		offset: 1,
		size: 20,
		fill: true
	},
	cells: {},
	getPixelPosition( x, y )
	{
		var point = { x:0, y:0 };
		point.x = ( x * this.cell.size ) + ( x * this.cell.offset );
		point.y = ( y * this.cell.size ) + ( y * this.cell.offset );
		return point;
	}
}
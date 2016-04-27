var MapCellViewRoad = 
{
	update( cellModel )
	{
		this.draw();
		for( var i = 0; i < cellModel.directions.length; i++ )
		{
			this.ctx.drawImage( document.getElementById( cellModel.directions[ i ] ), 0, 0 );
		}
	}
}
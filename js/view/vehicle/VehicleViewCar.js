var VehicleViewCar = 
{
	update( cellModel )
	{
		this.model = cellModel;
		this.draw();
		if( cellModel.heading == "EW" || cellModel.heading == "WE" )
		{
			this.clear();
			this.ctx.beginPath();
			this.ctx.strokeStyle = this.model.color;
			this.ctx.fillStyle = this.model.color;
			var center = ( Map.cell.size / 2 ) - ( this.model.sizeX / 2 );
			this.ctx.fillRect( 0, center, this.model.sizeY, this.model.sizeX );
		}
		else
		{
			this.draw();
		}

	}
}
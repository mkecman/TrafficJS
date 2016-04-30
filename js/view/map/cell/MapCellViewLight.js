var MapCellViewLight = 
{
	update( cellModel )
	{
		this.model.model.color = cellModel.color;
		this.draw();
	}
}
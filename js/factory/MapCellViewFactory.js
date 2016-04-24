var MapCellViewFactory = 
{
	model: {},
	init()
	{

	},
	setup( types )
	{
		for ( var type in types ) 
		{
			var cell = Object.create( MapCellView );
			cell.init( { size: MapConfig.cell.size, color: MapCellColor[ types[ type ] ], fill:MapConfig.cell.fill } );
			this.model[ types[ type ] ] = cell;
		}
	}
}
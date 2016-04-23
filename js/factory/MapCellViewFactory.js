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
			cell.init( { size: 10, color: MapCellColor[ types[ type ] ], fill:false } );
			this.model[ types[ type ] ] = cell;
		}
	}
}
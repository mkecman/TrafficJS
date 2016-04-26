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
			//var cell = Object.create( window[ "MapCellView" + types[ type ] ] );

			var cell = $.extend( true, {}, window[ "MapCellView" + types[ type ] ], MapCellView );
			cell.init( { size: MapConfig.cell.size, fill:MapConfig.cell.fill, model: window[ "MapCell" + types[ type ] ] } );
			this.model[ types[ type ] ] = cell;
		}
	},
	update( cellModel )
	{
		var cellView = this.model[ cellModel.type ];
		cellView.update( cellModel );

		return cellView;
	}
}
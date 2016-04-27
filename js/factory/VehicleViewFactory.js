var VehicleViewFactory = 
{
	model: {},
	init()
	{

	},
	setup( types )
	{
		for ( var type in types ) 
		{
			var cell = $.extend( true, {}, VehicleView, window[ "VehicleView" + types[ type ] ] );
			cell.init( window[ "Vehicle" + types[ type ] ] );
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
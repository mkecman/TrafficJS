var VehicleController =
{
	view: VehiclesView,
	map: Map,
	init()
	{
		var car = VehicleFactory( { type: VehicleType.CAR } );
		Vehicles.model.push( car );
		VehiclesView.draw( Vehicles.model );
	},
	update()
	{
		Vehicles.model[ 0 ].y += 2;
		VehiclesView.draw( Vehicles.model );

		requestAnimationFrame( applicationUpdate );
	}
}
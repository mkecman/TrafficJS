var VehicleController =
{
	view: VehiclesView,
	map: Map,
	finder: null,
	init()
	{
		this.finder = HomeFinder;
		this.finder.init();

		var car = VehicleFactory( { type: VehicleType.CAR } );
		Vehicles.model.push( car );
		VehiclesView.draw( Vehicles.model );
	},
	loadMap()
	{
		this.finder.loadMap( this.map );
		//finds start & end mapcells
		if( this.map.startMapCells.length > 0 && this.map.endMapCells.length > 0 )
		{
			var startCell = this.map.startMapCells[ getRandomInt( 0, this.map.startMapCells.length - 1 ) ];
			var endCell = this.map.endMapCells[ getRandomInt( 0, this.map.endMapCells.length - 1 ) ];
			
			//reset vehicle position
			var startPoint = this.map.getPixelPosition( startCell.x, startCell.y );
			Vehicles.model[ 0 ].x = startPoint.x;
			Vehicles.model[ 0 ].y = startPoint.y;
			
			//find path
			Vehicles.model[ 0 ].path = this.finder.getPath( startCell, endCell );
			Vehicles.model[ 0 ].currentPathStep = 0;
			
			applicationUpdate();
		}
		else
			alert( "Please define at least one start & end position." );
	},
	update()
	{
		var car = Vehicles.model[0];
		if( car.currentPathStep < car.path.length)
		{
			x = car.path[ car.currentPathStep ][ 0 ];
			y = car.path[ car.currentPathStep ][ 1 ];
			if( this.map.canEnterCellRealTime( x, y ) )
			{
				var newCarPoint = this.map.getPixelPosition( x, y );
				car.x = newCarPoint.x;
				car.y = newCarPoint.y;
				Vehicles.model[ 0 ].currentPathStep++;
			}
			VehiclesView.draw( Vehicles.model );
		}
	}
}
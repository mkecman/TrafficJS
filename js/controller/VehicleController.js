var VehicleController =
{
	view: VehiclesView,
	map: Map,
	startMapCells: [],
	endMapCells: [],
	finder: null,
	animTick: 0,
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
		this.findStartEndMapCells();
		if( this.startMapCells.length > 0 && this.endMapCells.length > 0 )
		{
			var startCell = this.startMapCells[ getRandomInt( 0, this.startMapCells.length - 1 ) ];
			var endCell = this.endMapCells[ getRandomInt( 0, this.endMapCells.length - 1 ) ];
			
			//reset vehicle position
			var startPoint = this.map.getPixelPosition( startCell.x, startCell.y );
			Vehicles.model[ 0 ].x = startPoint.x;
			Vehicles.model[ 0 ].y = startPoint.y;
			
			//find path
			Vehicles.model[ 0 ].path = this.finder.getPath( startCell, endCell );
			Vehicles.model[ 0 ].currentPathStep = 0;
			requestAnimationFrame( applicationUpdate );
			
		}
		else
			alert( "Please define at least one start & end position." );
	},
	update()
	{
		//nextDirection = vehicle.tryGoNext( paths[ currentStep ] );
		//vehicle.move( nextDirection );

		//Vehicles.model[ 0 ].y -= 2;
		this.animTick++;
		if( this.animTick >= 60 )
		{
			this.animTick = 0;
			var car = Vehicles.model[0];
			if( car.currentPathStep < car.path.length)
			{
				var newCarPoint = this.map.getPixelPosition( car.path[ car.currentPathStep ][ 0 ], car.path[ car.currentPathStep ][ 1 ] );
				car.x = newCarPoint.x;
				car.y = newCarPoint.y;
				Vehicles.model[ 0 ].currentPathStep++;
				VehiclesView.draw( Vehicles.model );
				_logm("cao");
			}
		}

		requestAnimationFrame( applicationUpdate );
	},
	findStartEndMapCells()
	{
		var cells = this.map.cells;
		this.startMapCells = [];
		for (var x = 0; x < this.map.sizeX; x++) 
		{
			for (var y = 0; y < this.map.sizeY; y++) 
			{
				if( cells[ x ][ y ].type == MapCellType.START )
				{
					this.startMapCells.push( { x: x, y: y } );
				}
				if( cells[ x ][ y ].type == MapCellType.END )
				{
					this.endMapCells.push( { x: x, y: y } );
				}
			}
		}
	}
}
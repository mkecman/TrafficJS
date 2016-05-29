var VehicleController =
{
	view: VehiclesView,
	map: Map,
	finder: null,
	carGenerationTime: 500,
	totalCars: 500,
	reachedEndCars: 0,
	init()
	{
		this.finder = HomeFinder;
		this.finder.init();
	},
	loadMap()
	{
		this.finder.loadMap( this.map );
		if( this.map.startMapCells.length > 0 && this.map.endMapCells.length > 0 )
		{
			//make cars
			//for (var i = 0; i < this.map.startMapCells.length; i++) 
			for (var i = 0; i < this.totalCars; i++) 
			{
				var car = VehicleFactory( { type: VehicleType.CAR } );
				Vehicles.model.push( car );
			
				var startCell = this.map.startMapCells[ getRandomInt( 0, this.map.startMapCells.length - 1 ) ];
				var endCell = this.map.endMapCells[ getRandomInt( 0, this.map.endMapCells.length - 1 ) ];

				//reset vehicle position
				var startPoint = this.map.getPixelPosition( startCell.x, startCell.y );
				Vehicles.model[ i ].x = startPoint.x;
				Vehicles.model[ i ].y = startPoint.y;
				
				//find path
				//while( Vehicles.model[ i ].path.length == 0 )
				//{
					endCell = this.map.endMapCells[ getRandomInt( 0, this.map.endMapCells.length - 1 ) ];
					Vehicles.model[ i ].path = this.finder.getPath( startCell, endCell, car );
				//}
				if( Vehicles.model[ i ].path.length == 0 )
					_logm("no path", startCell.x, startCell.y, "|||", endCell.x, endCell.y );

				Vehicles.model[ i ].currentPathStep = -1 * getRandomInt( 0, this.carGenerationTime );
			}
			//applicationUpdate();
		}
		else
			alert( "Please define at least one start & end position." );
	},
	update()
	{
		var oldX, oldY;
		for (var i = 0; i < Vehicles.model.length; i++) 
		{
			var car = Vehicles.model[i];
			if( car.path.length == 0 || car.reachedEnd )
				continue;
			
			var nextPathStep = car.currentPathStep + 1;
			if( nextPathStep <= 0 )
			{
				car.currentPathStep++;
				continue;
			}

			if( nextPathStep < car.path.length)
			{
				x = car.path[ nextPathStep ][ 0 ];
				y = car.path[ nextPathStep ][ 1 ];
				if( this.map.canEnterCellRealTime( x, y ) )
				{
					oldX = car.path[ car.currentPathStep ][ 0 ];
					oldY = car.path[ car.currentPathStep ][ 1 ];
					this.map.cells[ oldX ][ oldY ].occupied = false;
					/*
					//make distance between cars
					if( car.heading == "WE" )
						this.map.cells[ oldX - 1 ][ oldY ].occupied = false;
					if( car.heading == "EW" )
						this.map.cells[ oldX + 1 ][ oldY ].occupied = false;
					if( car.heading == "NS" )
						this.map.cells[ oldX ][ oldY - 1 ].occupied = false;
					if( car.heading == "SN" )
						this.map.cells[ oldX ][ oldY + 1 ].occupied = false;
					*/

					var ns = "";
					var we = "";
					if( oldX - x < 0 )
						we = "WE"; //→
					if( oldX - x > 0 )
						we = "EW"; //←
					if( oldY - y < 0 )
						ns = "NS"; //↓
					if( oldY - y > 0 )
						ns = "SN"; //↑
					car.heading = ns + we;

					var newCarPoint = this.map.getPixelPosition( x, y );
					car.x = newCarPoint.x;
					car.y = newCarPoint.y;
					if( this.map.cells[ x ][ y ].type != MapCellType.END ) //ugly! rewrite
					{
						this.map.cells[ x ][ y ].occupied = true;
						/*
						//make distance between cars
						if( car.heading == "WE" )
							this.map.cells[ x - 1 ][ y ].occupied = true;
						if( car.heading == "EW" )
							this.map.cells[ x + 1 ][ y ].occupied = true;
						if( car.heading == "NS" )
							this.map.cells[ x ][ y - 1 ].occupied = true;
						if( car.heading == "SN" )
							this.map.cells[ x ][ y + 1 ].occupied = true;
						*/
					}
					car.currentPathStep++;
				}
			}
			else
			{
				car.reachedEnd = true;
				this.reachedEndCars++;
				$('#cars-count-div').html( "Passed cars count: " + this.reachedEndCars );
			}
		}
		VehiclesView.draw( Vehicles.model );
	},
	reset()
	{
		for (var i = 0; i < Vehicles.model.length; i++) 
		{
			var startCell = this.map.startMapCells[ getRandomInt( 0, this.map.startMapCells.length - 1 ) ];
			var endCell = this.map.endMapCells[ getRandomInt( 0, this.map.endMapCells.length - 1 ) ];
			
			//reset vehicle position
			var startPoint = this.map.getPixelPosition( startCell.x, startCell.y );
			Vehicles.model[ i ].x = startPoint.x;
			Vehicles.model[ i ].y = startPoint.y;
			
			//find path
			while( Vehicles.model[ i ].path.length == 0 )
			{
				endCell = this.map.endMapCells[ getRandomInt( 0, this.map.endMapCells.length - 1 ) ];
				Vehicles.model[ i ].path = this.finder.getPath( startCell, endCell, car );
			}
			Vehicles.model[ i ].currentPathStep = -1 * getRandomInt( 0, this.carGenerationTime );
			Vehicles.model[ i ].reachedEnd = false;
		}

		this.reachedEndCars = 0;
	}
}
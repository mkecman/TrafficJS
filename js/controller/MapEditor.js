var MapEditor = 
{
	model: null,
	view: null,
	mouseActive: false,
	init( model, view )
	{
		this.model = model;
		this.view = view;
	},
	loadMap( json )
	{
		this.model.name = json.name;
		this.model.model = json.model;
		this.updateView();
	},
	handleMapMouseDown( e )
	{
		this.mouseActive = true;
		this.handleMapMouseMove( e );
	},
	handleMapMouseMove( e )
	{
		var point = this.getMouseCell( e );
		if( this.mouseActive && point.x < MapConfig.map.sizeX && point.y < MapConfig.map.sizeY )
		{
			var cell = this.model.model[ point.x ][ point.y ];
			cell.type = $("input[name=map-editor-cell-type]:checked").val();
			cell.directions = [];
			$("input[name=map-editor-cell-direction]:checked").each( function(){ cell.directions.push( $(this).val() ) } );
			this.updateView();
		}
		else
		{
			this.mouseActive = false;
		}
	},
	handleMapMouseUp( e )
	{
		this.mouseActive = false;
	},
	getMouseCell( event )
	{
		var xPosition = Math.floor( event.offsetX / ( MapConfig.cell.size + MapConfig.cell.offset ) );
		var yPosition = Math.floor( event.offsetY / ( MapConfig.cell.size + MapConfig.cell.offset ) );
		return { x: xPosition, y: yPosition };
	},
	updateView()
	{
		this.view.draw( this.model, MapConfig.map.sizeX, MapConfig.map.sizeY );
	},
	setup( width, height )
	{
		var total = 0;
		for( var indexWidth = 0; indexWidth < width; indexWidth++ ) 
		{
			this.model.model[ indexWidth ] = {};
			for( var indexHeight = 0; indexHeight < height; indexHeight++ )
			{
				this.model.model[ indexWidth ][ indexHeight ] = MapCellFactory( { id: total, x: indexWidth, y: indexHeight, type: MapCellType.BLOCK } );
				total++;
			}
		}
	}
}
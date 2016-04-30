var MapEditor = 
{
	map: Map,
	view: MapView,
	mouseActive: false,
	loadMap()
	{
		if( DEBUG ) 
			this.generateEmptyMap();

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
		if( this.mouseActive && point.x < this.map.sizeX && point.y < this.map.sizeY )
		{
			var cell = this.map.cells[ point.x ][ point.y ];
			cell.type = $("input[name=map-editor-cell-type]:checked").val();
			$.extend( true, cell, window[ "MapCell" + cell.type ] );
			
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
	handleClearButtonClick( e )
	{
		this.generateEmptyMap();
	},
	getMouseCell( event )
	{
		var xPosition = Math.floor( event.offsetX / ( this.map.cell.size + this.map.cell.offset ) );
		var yPosition = Math.floor( event.offsetY / ( this.map.cell.size + this.map.cell.offset ) );
		return { x: xPosition, y: yPosition };
	},
	updateView()
	{
		this.view.draw( this.map );
	},
	generateEmptyMap()
	{
		var total = 0;
		var width = this.map.sizeX;
		var height = this.map.sizeY;
		this.map.cells = {};
		for( var indexWidth = 0; indexWidth < width; indexWidth++ ) 
		{
			this.map.cells[ indexWidth ] = {};
			for( var indexHeight = 0; indexHeight < height; indexHeight++ )
			{
				this.map.cells[ indexWidth ][ indexHeight ] = MapCellFactory( { id: total, x: indexWidth, y: indexHeight, type: MapCellType.BLOCK } );
				total++;
			}
		}
	}
}
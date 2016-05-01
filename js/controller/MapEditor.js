var MapEditor = 
{
	map: Map,
	view: MapView,
	mouseActive: false,
	currentCell: null,
	loadMap()
	{
		this.updateView();
	},
	handleMapMouseDown( e )
	{
		if( $('#map-editor-enabled').prop( 'checked' ) )
		{
			infoTooltip.show();
			this.mouseActive = true;
			this.handleMapMouseMove( e );
		}
		else
		{
			var point = this.getMouseCell( e );
			if( point.x < this.map.sizeX && point.y < this.map.sizeY )
			{
				var cell = this.map.cells[ point.x ][ point.y ];
				if( cell.type == MapCellType.LIGHT )
				{
					this.currentCell = cell;
					$('#green-duration').val( this.currentCell.greenDuration );
					$('#red-duration').val( this.currentCell.redDuration );
					$('#delay').val( this.currentCell.delay );
				}
			}
		}
	},
	handleMapMouseMove( e )
	{
		var point = this.getMouseCell( e );
		if( point.x < this.map.sizeX && point.y < this.map.sizeY )
		{
			var cell = this.map.cells[ point.x ][ point.y ];
			infoTooltip.setContent( '<pre>' + JSON.stringify( cell, null, 2 ) + '</pre>' );

			if( this.mouseActive )
			{
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
	handleLightChange()
	{
		this.currentCell.greenDuration = parseInt( $('#green-duration').val() );
		this.currentCell.redDuration = parseInt( $('#red-duration').val() );
		this.currentCell.delay = parseInt( $('#delay').val() );
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
		var width = 100;//this.map.sizeX;
		var height = 100; //this.map.sizeY;
		this.map.cells = {};
		for( var indexWidth = 0; indexWidth < width; indexWidth++ ) 
		{
			this.map.cells[ indexWidth ] = {};
			for( var indexHeight = 0; indexHeight < height; indexHeight++ )
			{
				this.map.cells[ indexWidth ][ indexHeight ] = MapCellFactory( { id: total, x: indexWidth, y: indexHeight, type: MapCellType.ROAD, directions: [ "WE", "EW", "NS", "SN" ] } );
				total++;
			}
		}
	},
	getCleanMap()
	{
		var tempMap = $.extend( true, {}, this.map );
		var cell;
		for (var x = 0; x < tempMap.sizeX; x++) 
		{
			for (var y = 0; y < tempMap.sizeY; y++) 
			{
				cell = tempMap.cells[ x ][ y ];
				cell.occupied = false;
				if( cell.type == MapCellType.LIGHT )
				{
					cell.greenTick = 0;
					cell.redTick = 0;
				}
			}
		}
		return tempMap;
	},
	reset()
	{
		var cell;
		for (var x = 0; x < this.map.sizeX; x++) 
		{
			for (var y = 0; y < this.map.sizeY; y++) 
			{
				cell = this.map.cells[ x ][ y ];
				cell.occupied = false;
				if( cell.type == MapCellType.LIGHT )
				{
					cell.greenTick = 0;
					cell.redTick = 0;
					cell.delayTick = cell.delay;
				}
			}
		}
	}
}
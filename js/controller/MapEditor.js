var MapEditor = 
{
	map: Map,
	view: MapView,
	selection: MapEditorSelectionView,
	mouseActive: false,
	currentCell: null,
	inEditorMode: false,
	copyMap: {},
	loadMap()
	{
		this.updateView();
	},
	handleMapMouseDown( e )
	{
		var point = this.getMouseCell( e );
		if( point.x < this.map.sizeX && point.y < this.map.sizeY )
		{
			var cell = this.map.cells[ point.x ][ point.y ];
			if( this.readyToPaste )
			{
				var startCell = $.extend( true, {}, cell );
				var startY = startCell.y;
				var newCell, oldCell;
				for ( var x in this.copyMap ) 
				{ 
					for( var y in this.copyMap[ x ] )
					{
						oldCell = this.copyMap[ x ][ y ];
						cell = $.extend( true, {}, this.map.cells[ startCell.x ][ startCell.y ] );
						newCell = this.map.cells[ startCell.x ][ startCell.y ];
						for (var prop in newCell) { if (newCell.hasOwnProperty(prop)) { delete newCell[prop]; } };
						for( var prop in oldCell )
						{
							newCell[ prop ] = oldCell[ prop ];
						}
						newCell.id = cell.id;
						newCell.x = cell.x;
						newCell.y = cell.y;

						startCell.y++;
					}
					startCell.x++;
					startCell.y = startY;
				}

				this.updateView();
				//this.copyMap = {};
				//this.readyToPaste = false;
				return;
			}


			this.mouseActive = true;
			infoTooltip.show();

			if( $("input[name=map-editor-enabled]:checked").val() == "true" )
				this.inEditorMode = true;
			else
				this.inEditorMode = false;
			
			if( !this.inEditorMode )
			{
				this.startPoint = $.extend( true, {}, cell );
				this.endPoint = $.extend( true, {}, this.startPoint );
				this.endPoint.x += 1;
				this.endPoint.y += 1;

				$('input:radio[value='+cell.type+']')[0].checked = true;

				$('input:checkbox[name=map-editor-cell-direction]').prop('checked', false);
				for( var i = 0; i < cell.directions.length; i++ )
				{
					$('input:checkbox[value='+ cell.directions[ i ] +']')[0].checked = true;
				}
				
				if( cell.type == MapCellType.LIGHT )
				{
					this.currentCell = cell;
					$('#light-green-duration').val( this.currentCell.greenDuration );
					$('#light-red-duration').val( this.currentCell.redDuration );
					$('#light-start-index').val( this.currentCell.startIndex );
				}
				else
				{
					this.currentCell = null;
					$('#light-green-duration').val( "" );
					$('#light-red-duration').val( "" );
					$('#light-start-index').val( "" );
				}
			}
			this.handleMapMouseMove( e ); 
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
				if( this.inEditorMode )
				{
					cell.type = $("input[name=map-editor-cell-type]:checked").val();
					if( cell.type == MapCellType.BLOCK )
					{
						var newCell = MapCellFactory( { id: cell.id, x: cell.x, y: cell.y, type: MapCellType.BLOCK } );
						for (var prop in cell) { if (cell.hasOwnProperty(prop)) { delete cell[prop]; } };
						cell.id = newCell.id;
						cell.type = newCell.type;
						cell.x = newCell.x;
						cell.y = newCell.y;
					}
					
					$.extend( true, cell, window[ "MapCell" + cell.type ] );
					cell.directions = [];
					$("input[name=map-editor-cell-direction]:checked").each( function(){ cell.directions.push( $(this).val() ) } );
					this.updateView();
				}
				else
				{
					this.endPoint = $.extend( true, {}, cell );
					this.endPoint.x += 1;
					this.endPoint.y += 1;
					this.updateSelection();
				}
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
		if( this.currentCell != null )
		{
			this.currentCell.greenDuration = parseInt( $('#light-green-duration').val() );
			this.currentCell.redDuration = parseInt( $('#light-red-duration').val() );
			this.currentCell.startIndex = parseInt( $('#light-start-index').val() );
		}
	},
	getMouseCell( event )
	{
		var xPosition = Math.floor( event.offsetX / ( this.map.cell.size + this.map.cell.offset ) );
		var yPosition = Math.floor( event.offsetY / ( this.map.cell.size + this.map.cell.offset ) );
		return { x: xPosition, y: yPosition };
	},
	updateSelection()
	{
		this.selection.draw( this.startPoint, this.endPoint );
	},
	updateView()
	{
		this.view.draw( this.map );
	},
	generateEmptyMap()
	{
		var total = 0;
		this.map.sizeX = 70;
		this.map.sizeY = 45;

		var width = this.map.sizeX;
		var height = this.map.sizeY;

		this.map.cells = {};
		for( var indexWidth = 0; indexWidth < width; indexWidth++ ) 
		{
			this.map.cells[ indexWidth ] = {};
			for( var indexHeight = 0; indexHeight < height; indexHeight++ )
			{
				//this.map.cells[ indexWidth ][ indexHeight ] = MapCellFactory( { id: total, x: indexWidth, y: indexHeight, type: MapCellType.ROAD, directions: [ "WE", "EW", "NS", "SN" ] } );
				this.map.cells[ indexWidth ][ indexHeight ] = MapCellFactory( { id: total, x: indexWidth, y: indexHeight, type: MapCellType.BLOCK } );
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
					cell.tick = cell.startIndex;
					cell.stopLight = false;
				}

				if( cell.stopLight != undefined )
				{
					cell.stopLight = false;
				}
			}
		}
	},
	copySelection()
	{
		this.copyMap = {};
		for (var x = this.startPoint.x; x < this.endPoint.x; x++) 
		{
			this.copyMap[ x ] = {};
			for (var y = this.startPoint.y; y < this.endPoint.y; y++) 
			{
				this.copyMap[ x ][ y ] = $.extend( true, {}, this.map.cells[ x ][ y ] );
			}
		}

		this.readyToPaste = true;
	}
}
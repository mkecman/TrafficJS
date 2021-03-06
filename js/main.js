window.onload = function()
{
	var includes = 
	[
		"js/randomColor.js",
		"js/model/Map.js",////////////////////////////MAP
		"js/model/enum/MapCellType.js",
		"js/model/map/cell/MapCell.js",
		"js/model/map/cell/MapCellBlock.js",
		"js/model/map/cell/MapCellLight.js",
		"js/model/map/cell/MapCellRoad.js",
		"js/model/map/cell/MapCellCrossRoad.js",
		"js/model/map/cell/MapCellEnd.js",
		"js/model/map/cell/MapCellStart.js",
		"js/factory/MapCellFactory.js",
		"js/factory/MapCellViewFactory.js",
		"js/view/map/cell/MapCellView.js",
		"js/view/map/cell/MapCellViewRoad.js",
		"js/view/map/cell/MapCellViewCrossRoad.js",
		"js/view/map/cell/MapCellViewBlock.js",
		"js/view/map/cell/MapCellViewLight.js",
		"js/view/map/cell/MapCellViewStart.js",
		"js/view/map/cell/MapCellViewEnd.js",
		"js/view/map/MapView.js",
		"js/view/map/editor/MapEditorSelectionView.js",
		"js/pathfinding/pathfinding-browser.min.js",
		"js/model/enum/VehicleType.js", /////////////////////VEHICLE
		"js/model/vehicle/Vehicle.js",
		"js/model/vehicle/Vehicles.js",
		"js/model/vehicle/VehicleCar.js",
		"js/model/vehicle/VehicleBicycle.js",
		"js/model/vehicle/VehicleBus.js",
		"js/factory/VehicleFactory.js",
		"js/factory/VehicleViewFactory.js",
		"js/view/vehicle/VehicleView.js",
		"js/view/vehicle/VehiclesView.js",
		"js/view/vehicle/VehicleViewBicycle.js",
		"js/view/vehicle/VehicleViewCar.js",
		"js/view/vehicle/VehicleViewBus.js",
		"js/controller/CrossRoadController.js",
		"js/controller/MapController.js",
		"js/controller/MapEditor.js",
		"js/controller/HomeFinder.js",
		"js/controller/VehicleController.js",
		"js/controller/LightsController.js"
	];

	getScripts( includes, function(){ initApp(); } );
};

var infoTooltip;

function initApp()
{
	Opentip.defaultStyle = "dark";
	infoTooltip = new Opentip($("#map-canvas") );
	
	setupEventListeners();

	//this.loadMap( "bulevar2.json" );
}

function loadMap( path )
{
	$.getJSON( 'maps/' + path, function( json, textStatus ) 
	{
		mapLoaded( json );
	});
}

function mapLoaded( json )
{
	$.extend( true, Map, json );
	MapController.findMapCells();
	$( '#map-name' ).val( Map.name );

	VehiclesView.init( $('#vehicle-canvas').get( 0 ) );
	MapView.init( $('#map-canvas').get( 0 ) );
	MapEditorSelectionView.init( $('#selection-canvas').get( 0 ) );
	VehicleController.init();

	MapEditor.loadMap();
	VehicleController.loadMap();
	VehicleController.update();
	LightsController.init();

	applicationUpdate();
}

var animationTick = 0;
function applicationUpdate()
{
	animationTick++;
	if( animationTick >= 1 )
	{
		
		animationTick = 0;
		LightsController.update();
		VehicleController.update();
		MapView.draw( Map );
		
	}

	requestAnimationFrame( applicationUpdate );
}

function setupEventListeners()
{
	$('#map-canvas').mousedown( function( e ){ MapEditor.handleMapMouseDown( e ) } );
	$('#map-canvas').mousemove( function( e ){ MapEditor.handleMapMouseMove( e ) } );
	$('#map-canvas').mouseup( function( e ){ MapEditor.handleMapMouseUp( e ) } );
	$('#clear-button').click( function( e ){ MapEditor.handleClearButtonClick( e ) } );
	$('#reset-button').click( function( e ){ VehicleController.reset(); MapEditor.reset(); } );
	$('#copy-button').click( function( e ){ MapEditor.copySelection() } );
}

function handleMapEditorFormSubmit() 
{
	if( $('#save-button').html() == "SAVE")
	{
		$('#save-button').html("SAVING");
		Map.name = $( '#map-name' ).val();

		tempMap = MapEditor.getCleanMap();

		var values = [];
		values.push( { name: "name", value: Map.name } );
		values.push( { name: "json", value: JSON.stringify( tempMap ) } );
		$.php('php/SaveMap.php', values );
	}
}

function handleNameChange() 
{
	if( $('#save-button').html() != "SAVE")
		$('#save-button').html("SAVE");
}

function handleResize() 
{
	
}

php.messages.MapSaved = function (msg, params)
{
	//$('#map-name').val("");
	$('#save-button').html("SAVE");
}

php.complete = function(XMLHttpRequest, textStatus) 
{
	
};
php.error = function(xmlEr, typeEr, except) 
{
	console.log(xmlEr);
};
window.onload = function()
{
	var includes = 
	[
		"js/model/MapConfig.js",
		"js/model/enum/MapCellType.js",
		"js/model/enum/MapCellColor.js",
		"js/model/Vehicle.js",
		"js/model/Map.js",
		"js/model/MapCell.js",
		"js/factory/MapCellFactory.js",
		"js/factory/MapCellViewFactory.js",
		"js/factory/VehicleFactory.js",
		"js/view/MapCellView.js",
		"js/view/MapView.js",
		"js/controller/MapEditor.js",
		"js/controller/VehicleController.js"
	];

	getScripts( includes, function(){ initApp(); } );
};

function initApp()
{
	setupEventListeners();
	
	MapEditor.init( Map, MapView );
	MapView.init( $('#map-canvas').get( 0 ) );
	
	$.getJSON('maps/default.json', function(json, textStatus) 
	{
		MapEditor.loadMap( json );
	});
}

function setupEventListeners()
{
	$('#map-canvas').mousedown( function( e ){ MapEditor.handleMapMouseDown( e ) } );
	$('#map-canvas').mousemove( function( e ){ MapEditor.handleMapMouseMove( e ) } );
	$('#map-canvas').mouseup( function( e ){ MapEditor.handleMapMouseUp( e ) } );
}

function handleMapEditorFormSubmit() 
{
	if( $('#save-button').html() == "SAVE")
	{
		$('#save-button').html("SAVING");
		Map.name = $( '#map-name' ).val();

		var values = [];
		values.push( { name: "name", value: Map.name } );
		values.push( { name: "json", value: JSON.stringify( Map ) } );
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

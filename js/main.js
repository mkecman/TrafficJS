window.onload = function()
{
	var includes = 
	[
		"js/model/enum/MapCellType.js",
		"js/model/enum/MapCellColor.js",
		"js/model/Vehicle.js",
		"js/model/Map.js",
		"js/model/MapCell.js",
		"js/factory/MapCellFactory.js",
		"js/factory/MapCellViewFactory.js",
		"js/view/MapCellView.js",
		"js/view/MapView.js"
	];

	getScripts( includes, function(){ initApp(); } );
};

function initApp()
{
	var size = 50;
	Map.setup( size, size );
	MapView.init( $('#map-canvas').get( 0 ) );
	MapView.draw( Map.model, size, size );
}

function handleResize() 
{
	
}

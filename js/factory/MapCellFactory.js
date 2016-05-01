var MapCellFactory = function init( options )
{
	return $.extend( true, {}, MapCell, window[ "MapCell" + options.type ], options );
}
var MapCellFactory = function init( options )
{
	return $.extend( true, {}, MapCell, options, window[ "MapCell" + options.type ] );
}
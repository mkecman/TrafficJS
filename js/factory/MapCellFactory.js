var MapCellFactory = function init( options )
{
	options.color = MapCellColor[ options.type ];
	return $.extend( {}, MapCell, options );
}
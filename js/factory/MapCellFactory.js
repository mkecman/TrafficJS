var MapCellFactory = function init( options )
{
	options.color = MapCellColor[ options.type ];
	return Object.assign( Object.create( MapCell ), options );
}
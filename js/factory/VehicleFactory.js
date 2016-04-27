var VehicleFactory = function init( options )
{
	return $.extend( true, {}, Vehicle, options, window[ "Vehicle" + options.type ] );
}
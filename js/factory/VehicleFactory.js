var VehicleFactory = function init( options )
{
	var rColor = randomColor( {hue: 'random',luminosity: 'dark',count: 1} )
	options.color = rColor[ 0 ];
	return $.extend( true, {}, Vehicle, window[ "Vehicle" + options.type ], options );
}
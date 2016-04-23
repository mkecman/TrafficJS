var ENABLE_ANIMATIONS = false;
var DEBUG = false;
var ELEMENTS_DRAWN_FRAME = 10000;

window.requestAnimationFrame = window.requestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(f){return setTimeout(f, 1000/60)} // simulate calling code 60 
 
window.cancelAnimationFrame = window.cancelAnimationFrame
	|| window.mozCancelAnimationFrame
	|| function(requestID){clearTimeout(requestID)} //fall back

function getScripts(inserts, callback)
{
	var nextInsert = inserts.shift();
	if (nextInsert != undefined)
	{
		if( DEBUG ) console.log("Calling "+nextInsert);
		
		jQuery.getScript(nextInsert)
			.done(function(){ getScripts( inserts, callback ) } )
			.fail(function(jqxhr, settings, exception){alert("Including "+nextInsert+" failed:\n" +exception)});
	}
	else
	{
		if (callback != undefined) callback();
	}
};

var inheritsFrom = function (child, parent) {
	child.prototype = Object.create(parent.prototype);
};

var round = function( number )
{
	return ~~( 0.5 + number );
}

var _logm = function()
{
	var i;
	var output = "";
	for (i = 0; i < arguments.length; i++) 
	{
		output += arguments[ i ] + " : ";
	}
	console.log( output );
}

var getRandomInt = function(min, max) 
{
  if ( min < 0 ) min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function median(sequence) 
{
  sequence.sort();
  return sequence[Math.ceil(sequence.length / 2)];
}

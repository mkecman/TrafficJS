<?php

?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Flow Control</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="apple-touch-icon" href="apple-touch-icon.png">

		<link rel="stylesheet" href="css/normalize.min.css">
		<link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">

		<script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
		<script src="js/jqueryphp/jquery.php.js" type="text/javascript"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		
	</head>
	<body onresize="handleResize()">
		<!--[if lt IE 8]>
			<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->

	<div id="main-canvas">
		<canvas id="map-canvas"></canvas>
		<canvas id="vehicle-canvas"></canvas>
	</div>

	<div id="toolbar">
		<label>TOOLBAR</label><br/>
		<form id="map-editor-form" onsubmit="handleMapEditorFormSubmit(); return false;">
			<input type="radio" name="map-editor-cell-type" value="0" checked="checked">Road</input>
			<input type="radio" name="map-editor-cell-type" value="999">Traffic Light</input>
			<input type="radio" name="map-editor-cell-type" value="1000">Block</input><br/>
			<input type="radio" name="map-editor-cell-type" value="2000">Start</input>
			<input type="radio" name="map-editor-cell-type" value="3000">End</input>
			<hr/>
			<ul>
				<li><img src="img/directions/NW.png" /><input type="checkbox" name="map-editor-cell-direction" value="NW">NW</input></li>
				<li><img src="img/directions/NS.png" /><input type="checkbox" name="map-editor-cell-direction" value="NS">NS</input></li>
				<li><img src="img/directions/NE.png" /><input type="checkbox" name="map-editor-cell-direction" value="NE">NE</input></li>
			</ul>
			<ul>
				<li><img src="img/directions/EN.png" /><input type="checkbox" name="map-editor-cell-direction" value="EN">EN</input></li>
				<li><img src="img/directions/EW.png" /><input type="checkbox" name="map-editor-cell-direction" value="EW">EW</input></li>
				<li><img src="img/directions/ES.png" /><input type="checkbox" name="map-editor-cell-direction" value="ES">ES</input></li>
			</ul>
			<ul>
				<li><img src="img/directions/WN.png" /><input type="checkbox" name="map-editor-cell-direction" value="WN">WN</input></li>
				<li><img src="img/directions/WE.png" /><input type="checkbox" name="map-editor-cell-direction" value="WE">WE</input></li>
				<li><img src="img/directions/WS.png" /><input type="checkbox" name="map-editor-cell-direction" value="WS">WS</input></li>
			</ul>
			<ul>
				<li><img src="img/directions/SW.png" /><input type="checkbox" name="map-editor-cell-direction" value="SW">SW</input></li>
				<li><img src="img/directions/SN.png" /><input type="checkbox" name="map-editor-cell-direction" value="SN" checked="checked">SN</input></li>
				<li><img src="img/directions/SE.png" /><input type="checkbox" name="map-editor-cell-direction" value="SE">SE</input></li>
			</ul>
			<input id="map-name" name="name" placeholder="Name Your Map" title="2 characters minimum" pattern=".{2,255}" value="default" required oninput="handleNameChange()"></input><br/>
			<button id="save-button">SAVE</button>
		</form>
	</div>
	<div id="gallery">
		<div id="gallery-header">
			<label>GALLERY</label>
		</div>
	</div>
<?php
$version = file_get_contents( "version" );

$jsInc = '<script src="js/Globals.js?v='. $version .'"></script>' .
		'<script src="js/main.js?v='. $version .'"></script>'
		;

print $jsInc;

?>
		<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
		<script>
			/*(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
			function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
			e=o.createElement(i);r=o.getElementsByTagName(i)[0];
			e.src='//www.google-analytics.com/analytics.js';
			r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
			ga('create','UA-XXXXX-X','auto');ga('send','pageview');
			*/
		</script>
	</body>
</html>

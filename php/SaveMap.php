<?php
require_once "jQuery.php";

$file = fopen("../maps/". $_POST[ "name" ] .".json", "w") or die("Unable to open file!");
fwrite( $file, $_POST[ "json" ] );
fclose( $file );

jQuery::addMessage( "", "MapSaved" );
jQuery::getResponse();

?>
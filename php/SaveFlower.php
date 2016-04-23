<?php
require_once "jQuery.php";
require_once "MySQLSimple.php";

$db = new MySQLSimple();

$values = array
(
	'name' => $_POST[ "name" ],
	'author' => $_POST[ "author" ],
	'json' => $_POST[ "json" ]
);
$db->query_insert( "flowers", $values );
$latestID = $db->fetch_one_value("SELECT MAX(id) FROM flowers");

$image = fopen("../flowers/flower-". $latestID .".png", "w") or die("Unable to open file!");
//$data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $_POST[ "image" ]));
$data = base64_decode( $_POST[ "image" ] );
fwrite( $image, $data );
fclose( $image );

$thumb = fopen("../flowers/thumbs/flower-". $latestID .".png", "w") or die("Unable to open file!");
//$data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $_POST[ "thumb" ]));
$data = base64_decode( $_POST[ "thumb" ] );
fwrite( $thumb, $data );
fclose( $thumb );

jQuery::addMessage( "", "flowerSaved" );
jQuery::getResponse();

?>
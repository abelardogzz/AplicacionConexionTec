<?php

header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';

$action = $_POST["action"];

switch($action){
	case "LOADPROFILE" : ProfileSerivce();
					break;
	case "EDITPROFILE" : EditProfileSerivce();
					break;

}

/**
	Tomando el ID del usuario de la sesion actual hace la llamada
	para obtener sus datos y mostrarlos
*/
function ProfileSerivce(){
	session_start();
	
	$username = $_SESSION["user"];
	$result = attemptProfileService($username);

	//El resultado, si el 'status' es 'success' manda los datos del perfil
	if ($result["status"] == "SUCCESS"){

		echo json_encode($result["profile"]);
	}	
	else{
		//Si no es 'success' manda un error
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}

function EditProfileSerivce(){
	$cambios = $_POST["datos"];

	$result = attemptEditProfileService($cambios);

	//El resultado, si el 'status' es 'success' manda los datos del perfil
	if ($result["status"] == "SUCCESS"){

		echo json_encode();
	}	
	else{
		//Si no es 'success' manda un error
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}

}






?>
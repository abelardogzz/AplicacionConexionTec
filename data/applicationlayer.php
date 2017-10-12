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
	
	//$username = $_SESSION["user"];
	$username = $_POST["email"]; //Se utiliza el email para identificarlo
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
	$nombre = $_POST["Nombre"];
	$appP = $_POST["ApellidoP"];
	$appM = $_POST["ApellidoM"];
	$username = $_POST["username"];
	$email = $_POST["email"];

	$result = attemptEditProfileService($nombre,$appP,$appM,$username,$email);

	//El resultado, si el 'status' es 'success' manda los datos del perfil
	if ($result["status"] == "SUCCESS"){

		echo json_encode($result);
	}	
	else{
		//Si no es 'success' manda un error
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}

}






?>
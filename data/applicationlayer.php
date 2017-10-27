<?php

header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';

$action = $_POST["action"];

switch($action){
	case "LOADPROFILE" : ProfileSerivce();
					break;
	case "EDITPROFILE" : EditProfileSerivce();
					break;
	case "LOADPROJECT" : ProjectSerivce();
					break;
	case "EDITPROJECT" : EditProjectSerivce();
					break;

}

/**
	Tomando el ID del usuario de la sesion actual hace la llamada
	para obtener sus datos y mostrarlos
*/
function ProfileSerivce(){	
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
	$email = $_POST["email"];

	$result = attemptEditProfileService($nombre,$appP,$appM,$email);

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

function ProjectSerivce(){
	$pID = $_POST["projectID"];

	$result = attemptProjectService($pID);

	if($result["status"] == "SUCCESS"){
		echo json_encode($result["project"]);
	}
	else{
		//Si no es 'success' manda un error
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}

function EditProjectSerivce(){
	$pID = $_POST["ID"];
	$Nombre = $_POST["Nombre"];
	$Descripcion = $_POST["Descripcion"];
	$Imagen = $_POST["Imagen"];
	$Area = $_POST["Area"];

	$result = attemptEditProjectService($pID,$Nombre,$Descripcion,$Imagen,$Area);

	if($result["status"] == "SUCCESS"){
		echo json_encode($result);
	}
	else{
		//Si no es 'success' manda un error
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}
}






?>
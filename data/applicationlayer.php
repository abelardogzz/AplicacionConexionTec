<?php
    header('Accept: application/json');
    header('Content-type: application/json');
    require_once __DIR__ . '/dataLayer.php';
    //ini_set("display_errors",1);
    //ini_set("log_errors",1);
//session_start();
//$_SESSION["current_user"] = 1;
$action = $_POST["action"];

switch($action){
    case "CHECKSESSION" :
        checkSession();
                    break;
	case "LOADPROFILE" : 
        ProfileSerivce();
					break;
	case "EDITPROFILE" : 
        EditProfileSerivce();
					break;
	case "LOADPROJECT" : 
        ProjectSerivce();
					break;
	case "EDITPROJECT" : 
        EditProjectSerivce();
					break;
    case 'GETPROJECT':
            getProject();
                    break;
    case 'VIEWPROJECT':
            viewProject();
                    break;
    case 'VIEWCOMMENTS':
            viewComments();
            break;
    case 'VIEWRATING':
            viewRating();
            break;
    case 'INSERTCOMMENT':
            insertComment();
            break;
    case 'UPDATERATING':
            updateRating();
            break;
    case "CREAVIRTUALSAMPLE" : CrearVirtualSample();
        break;
    case "DETIENECALIFICACIONES" : UpdateCalificacion();
        break;
    case "REANUDACALIFICACIONES" : UpdateCalificacion();
        break;
    case "DETIENEREGISTRO" : UpdateRegistro();
        break;
    case "REANUDAREGISTRO" : UpdateRegistro();
        break;
    case "LOADVIRTUALSAMPLES" : LoadSamples();
        break;
    case "UPDATECURRENTVS" : UpdateVS();
        break;
}

function checkSession(){
    $user = attemptCheckSession();
    if($user["sesion"] != null){
         echo json_encode((int)$user["sesion"]);    
    }else{
        die();
    }
    //echo $user["sesion"];
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
function getProject() {
        $response = attemptLoadProjects();
		$responseStatus = $response["responseStatus"];

		if ($responseStatus == "EXITO") {
			$responseData = $response["responseData"];
         
			echo json_encode($responseData);
		}
		else {
			header('HTTP/1.1 500 Bad connection to Database');
            die("The server is down, we couldn't establish the DB connection");
		}
        
}
function viewProject() {
    $id = $_POST['id'];
    $response = attemptViewProject($id);
	$responseStatus = $response["responseStatus"];

	if ($responseStatus["status"] == "EXITO") {	
		$responseData = $response["responseData"];
		echo json_encode($responseData);
	}
	else {
		header('HTTP/1.1 500 Bad connection to Database');
        die("The server is down, we couldn't establish the DB connection");
	}
    
}
function viewComments() {
        $id = $_POST['id'];
        $response = attemptViewComments($id);
        $responseStatus = $response["responseStatus"];

        if ($responseStatus["status"] == "EXITO") { 
            $responseData = $response["responseData"];
            echo json_encode($responseData);
        }
        else {
            header('HTTP/1.1 500 Bad connection to Database');
            die("The server is down, we couldn't establish the DB connection");
        }
        
}

function viewRating() {
    $project_id = $_POST['project_id'];
    $user_id = checkSession();
    $response = attemptViewRating($project_id, $user_id);
    $responseStatus = $response["responseStatus"];

    if ($responseStatus["status"] == "EXITO") { 
        $responseData = $response["responseData"];
        echo json_encode($responseData);
    }
    else {
        header('HTTP/1.1 500 Bad connection to Database');
        die("The server is down, we couldn't establish the DB connection");
    }
}

function updateRating() {
    $user_id = $_POST['userID'];
    $project_id = $_POST['project_id'];
    $rating = $_POST['rating'];
    $response = attemptUpdateRating($project_id, $user_id, $rating);
    $responseStatus = $response["responseStatus"];

    if ($response["status"] == "EXITO") { 
        $responseData = $response["status"];
        echo json_encode($responseData);
    }
    else {
        header('HTTP/1.1 500 Bad connection to Database');
        die("The server is down, we couldn't establish the DB connection");
    }
}

function insertComment() {
    $user_id = $_POST['userID'];
    $project_id = $_POST['project_id'];
    $text = $_POST['text'];
    $responseStatus = attemptInsertComment($user_id, $project_id, $text);
    if ($responseStatus["status"] == "EXITO") { 
        $responseData = array("id" => $user_id);
        echo json_encode($responseData);
    }else {
        header("HTTP/1.1 500 Bad connection to Database");
        die("The server is down, we couldn't establish a DB connection");
    }
}

    
function CrearVirtualSample(){
    $dInicio = $_POST["fehcaInicio"];
    $dFin = $_POST["fechaFin"];
    $Current = True ;

    $result = attemptCreaVirtualSample($dInicio,$dFin,$Current);

    if ($result["status"] == "SUCCESS"){
        echo json_encode($result);
    }
    else{
        header('HTTP/1.1 500'.$result["status"]);
        die($result["status"]);
    }
}

function UpdateCalificacion(){
    $valor = $_POST["valor"];

    $result = attemptUpdateCalificacion($valor);

    if ($result["status"] == "SUCCESS"){
        echo json_encode($result);
    }
    else{
        header('HTTP/1.1 500'.$result["status"]);
        die($result["status"]);
    }

}

function UpdateRegistro(){
    $valor = $_POST["valor"];

    $result = attemptUpdateRegistro($valor);

    if ($result["status"] == "SUCCESS"){
        echo json_encode($result);
    }
    else{
        header('HTTP/1.1 500'.$result["status"]);
        die($result["status"]);
    }
}

function LoadSamples(){

    $result = attemptLoadSamples();

    if ($result["status"] == "SUCCESS"){
        echo json_encode($result);
    }
    else{
        header('HTTP/1.1 500'.$result["status"]);
        die($result["status"]);
    }
}

function UpdateVS(){
    $Id = $_POST["id"];

    $result = attemptUpdateVS($Id);
    if ($result["status"] == "SUCCESS"){
        echo json_encode($result);
    }
    else{
        header('HTTP/1.1 500'.$result["status"]);
        die($result["status"]);
    }
}

?>
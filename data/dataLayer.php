<?php
	
	function connectionToDataBase(){
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "conexiontec";

		$conn = new mysqli($servername, $username, $password, $dbname);
		
		if ($conn->connect_error){
			return null;
		}
		else{
			return $conn;
		}
	}

    function attemptCheckSession(){
        $conn = connectionToDataBase();
        if ($conn->connect_error) 
        {
            header('HTTP/1.1 500 Bad connection to Database');
            die("The server is down, we couldn't establish the DB connection");
        }
        else
        {
                session_start();

            if ($_SESSION["current_id"])
            {
                
                $idSesion = $_SESSION["current_id"];
                return array("sesion" => $idSesion);
                //json_encode($_SESSION["current_id"]);

            }
            else
            {
                header('HTTP/1.1 406 User not logged in'); 
                die('user is not logged in');
            }
        } 
    }
	function attemptProfileService($username){
		$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');
			//$userName = $_POST['username'];
			//$userPassword = $_POST['userPassword'];
			//PROFILE EXAMPLE 
			$sql = " SELECT * FROM Users WHERE user_id = '$username' ";
			$result = $conn->query($sql); 

			//echo $result->num_rows;
			if ($result->num_rows > 0)//Double check
			{
				
				// output data of each row
			    while($row = $result->fetch_assoc()) 
			    {
			    	$response = array('Pnombre' => $row['uPNombre'],
		    	 					'ApellidoP' => $row['uApellidoP'],
		    	 					'ApellidoM' => $row['uApellidoM'], 
		    	 					'email' => $row['uEmail']);   
			    	//array_push($comments, $response);
			    	

				}
				//echo ($response['fName']);
			    //echo json_encode($response);
			    $conn-> close();
			    return array("status" => "SUCCESS","profile" => $response);

			    //echo json_encode($result->fetch_assoc());
			}
			else
			{
				$conn -> close();
				return array("status" => "USERNAME NOT FOUND");
		    	//header('HTTP/1.1 406 User not found'); //Pre-Prepares a json file with mssg
		        //die("Wrong credentials provided!"); 
			}
		}else{
				$conn -> close();
				return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

	function attemptEditProfileService($nombre,$appP,$appM,$email){
		$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');

			$sqlVerifica = "SELECT * FROM Users WHERE uEmail = '$email'";
			$result = $conn->query($sqlVerifica); 

			//Verifica si no esta registrado ese correo antes
			if ($result->num_rows > 1)//Double check
			{
				$conn -> close();
				return array("status" => "Ese Correo ya esta registrado!");
		    	//header('HTTP/1.1 406 User not found'); //Pre-Prepares a json file with mssg
		        //die("Wrong credentials provided!"); 
			}
			else
			{//Realiza el update de datos
			//Queda pendiente el campo que hace referencia al registro
			//Eso lo puedo obtener de las sesiones pero no se cual vamos a usar
		        $sql = "UPDATE Users SET uPNombre = '$nombre', uApellidoP = '$appP', uApellidoM = '$appM', uEmail = '$email' WHERE uEmail = '$email' ";

		        if (mysqli_query($conn,$sql)){//True si se ejectua correcto
				    $conn-> close();
				    $datos = array('Pnombre' => $nombre,
		    	 					'ApellidoP' => $appP,
		    	 					'ApellidoM' => $appM, 
		    	 					'email' => $email);  
				    return array("status" => "SUCCESS","profile" => $datos);
				}
				else{//Error al hacer UPDATE en la BD
					$conn -> close();
					return array("status" => "ERROR al Editar");
				}

			    
			}
		}else{//Error de conexion con BD
				$conn -> close();
				return array("status" => "Problema de conexion con la Base de datos");
		}
	}

	function attemptProjectService($pID){
		$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');
			//$userName = $_POST['username'];
			//$userPassword = $_POST['userPassword'];
			//PROFILE EXAMPLE 
			$sql = " SELECT * FROM project WHERE project_id = '$pID' ";
			$result = $conn->query($sql); 

			//echo $result->num_rows;
			if ($result->num_rows > 0)//Double check
			{
				
				// output data of each row
			    while($row = $result->fetch_assoc()) 
			    {
			    	$response = array('ID' => $row['project_id'],
		    	 					'Nombre' => $row['pNombre'], 
		    	 					'Descripcion' => $row['pDescripcion'],
		    	 					'Imagen' => $row["pImagen1"],
		    	 					'Area' => $row['pArea']);   
			    	//array_push($comments, $response);
			    	

				}
			    $conn-> close();
			    return array("status" => "SUCCESS","project" => $response);
			}
			else
			{
				$conn -> close();
				return array("status" => "project NOT FOUND");
			}
		}else{
				$conn -> close();
				return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

	function attemptEditProjectService($pID,$Nombre,$Descripcion,$Imagen,$Area){
		$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');

			$sqlVerifica = "SELECT * FROM project WHERE project_id = '$pID'";
			$result = $conn->query($sqlVerifica); 

			//Verifica si no esta registrado ese correo antes
			if ($result->num_rows <= 0)//Double check
			{
				$conn -> close();
				return array("status" => "El proyecto No esta registrado!");
		    	//header('HTTP/1.1 406 User not found'); //Pre-Prepares a json file with mssg
		        //die("Wrong credentials provided!"); 
			}
			else
			{//Realiza el update de datos
			//Queda pendiente el campo que hace referencia al registro
			//Eso lo puedo obtener de las sesiones pero no se cual vamos a usar
		        $sql = "UPDATE project SET pNombre = '$Nombre',pDescripcion = '$Descripcion',pImage = '$Imagen',pArea = '$Area' WHERE project_id = '$pID' ";

		        if (mysqli_query($conn,$sql)){//True si se ejectua correcto
				    $conn-> close();
				    $datos = array('Pombre' => $Nombre,
		    	 					'email' => $Descripcion,
		    	 					'Imagen' => $Imagen,
		    	 					'Area' => $Area);  
				    return array("status" => "SUCCESS","project" => $datos);
				}
				else{//Error al hacer UPDATE en la BD
					$conn -> close();
					return array("status" => "ERROR al Editar");
				}

			    
			}
		}else{//Error de conexion con BD
				$conn -> close();
				return array("status" => "Problema de conexion con la Base de datos");
		}
	}
/*function attemptViewProject($id){
    $connection = connectionToDataBase();
		if ($connection != null) {
			$sql = "SELECT * FROM project WHERE project_id = '$id'";
			$result = $connection ->query($sql);

			if($result ->num_rows > 1) {
                $connection -> close();
				return array("status" => "409");
			    }else{
                $responseStatus = array("status" =>"EXITO");
	  			$responseData = array();
	  			while ($row = $result->fetch_assoc()) {	
			    	array_push($responseData, array('projectID' => $row['project_id'], 
                                          'virtualSampleID' => $row['virtualSample_id'],
                                          'userID' => $row['user_id'], 
                                          'pNombre' => $row['pNombre'], 
                                          'pDescripcion' => $row['pDescripcion'], 
                                          'pArea' => $row['pArea'], 
                                          'deleted' => $row['Deleted'], 
                                          'pFechaRegistro' => $row['pFechaRegistro'],  
                                          'pImagen1' => $row['pImagen1'], 
                                          'pImagen2' => $row['pImagen2'], 
                                          'pVideo' => $row['pVideo']));
			    }
			    $connection -> close();
				return array("responseStatus"=>$responseStatus,"responseData"=>$responseData);
			}	
		}
		else {
			$responseStatus = array("status" => "500");
			return array("responseStatus"=>$responseStatus);;
		}
    $responseStatus = array("status" => "500");
    return array("responseStatus"=>$responseStatus);;
}*/
function attemptViewProject($id){
    $connection = connectionToDataBase();
		if ($connection != null) {
            $sql = "SELECT project_id, virtualSample_id, project.user_id, pNombre, pDescripcion, pArea, project.Deleted, pFechaRegistro, pImagen1, pImagen2, pVideo, users.user_id, uPNombre, uApellidoP, uEmail From project JOIN users ON project.user_id = users.user_id WHERE project.project_id = '$id'";
			//$sql = "SELECT * FROM project WHERE project_id = '$id'";
			$result = $connection ->query($sql);

			if($result ->num_rows > 1) {
                $connection -> close();
				return array("status" => "409");
			    }else{
                $responseStatus = array("status" =>"EXITO");
                $responseData = array();
	  			while ($row = $result->fetch_assoc()) {	
			    	array_push($responseData, array('projectID' => $row['project_id'], 
                                          'virtualSampleID' => $row['virtualSample_id'],
                                          'userID' => $row['user_id'], 
                                          'pNombre' => utf8_encode($row['pNombre']), 
                                          'pDescripcion' => utf8_encode($row['pDescripcion']), 
                                          'pArea' => $row['pArea'], 
                                          'deleted' => $row['Deleted'], 
                                          'pFechaRegistro' => $row['pFechaRegistro'],  
                                          'pImagen1' => $row['pImagen1'], 
                                          'pImagen2' => $row['pImagen2'], 
                                          'pVideo' => $row['pVideo'],
                                          'userID2' => $row['user_id'],
                                          'primerNombre' => $row['uPNombre'],
                                          'segNombre' => $row['uApellidoP'],
                                          'email' => $row['uEmail'],
                                                   ));
			    }
			    $connection -> close();
				return array("responseStatus"=>$responseStatus,"responseData"=>$responseData);
			}	
		}
		else {
			$responseStatus = array("status" => "500");
			return array("responseStatus"=>$responseStatus);;
		}
    $responseStatus = array("status" => "500");
    return array("responseStatus"=>$responseStatus);;
}
function attemptLoadProjects(){
    $connection = connectionToDataBase();
		if ($connection != null) {
			$sql = "SELECT * FROM project";
			$result = $connection ->query($sql);

			if($result ->num_rows > 0) {
                $responseData = array();

	  			while ($row = $result->fetch_assoc()) {	
                    array_push($responseData, array('projectID' => $row['project_id'], 
                                          'virtualSampleID' => $row['virtualSample_id'],
                                          'userID' => $row['user_id'], 
                                          'pNombre' => utf8_encode($row['pNombre']), 
                                          'pDescripcion' => utf8_encode($row['pDescripcion']), 
                                          'pArea' => $row['pArea'], 
                                          'deleted' => $row['Deleted'], 
                                          'pFechaRegistro' => $row['pFechaRegistro'],  
                                          'pImagen1' => $row['pImagen1'], 
                                          'pImagen2' => $row['pImagen2'], 
                                          'pVideo' => $row['pVideo']));
                   /* $responseData = array('projectID' => $row['project_id'], 
                                          'virtualSampleID' => $row['virtualSample_id'],
                                          'userID' => $row['user_id'], 
                                          'pNombre' => $row['pNombre'], 
                                          'pDescripcion' => $row['pDescripcion'], 
                                          'pArea' => $row['pArea'], 
                                          'deleted' => $row['Deleted'], 
                                          'pFechaRegistro' => $row['pFechaRegistro'],  
                                          'pImagen1' => $row['pImagen1'], 
                                          'pImagen2' => $row['pImagen2'], 
                                          'pVideo' => $row['pVideo']);*/
			    }
			    $connection -> close();
				return array("responseStatus"=>"EXITO","responseData"=>$responseData);
			}
			else {	
				$connection -> close();
				$responseStatus = array("status" => "500");
				return array("responseStatus"=>$responseStatus);;
			}	
		}
		else {
			$responseStatus = array("status" => "500");
			return array("responseStatus"=>$responseStatus);;
		}
    $responseStatus = array("status" => "500");
    return array("responseStatus"=>$responseStatus);;
}
function attemptCheckRating($project_id){
    $connection = connectionToDatabase();
    
    if($connection != null){
        $sql = "SELECT AVG(grade) As ratings FROM grade WHERE project_id = '$project_id' GROUP BY project_id";
        $result = $connection -> query($sql);
        $responseData = array();
        if($result ->num_rows !=0){
            $responseStatus = array("status" => "EXITO");
            while($row = $result ->fetch_assoc()){
                array_push($responseData, array("rating" => $row["ratings"]));
            }
            $connection -> close();
            $responseStatus = array("status" => "EXITO");
            return array("responseStatus" => $responseStatus, "responseData" => $responseData);
        }else{
            $connection -> close();
            $responseStatus = array("status" => "EXITO");
            array_push($responseData, array("rating" => 5));
            return array("responseStatus" => $responseStatus, "responseData" => $responseData);
        }
    }else{
        $responseStatus = array("status" => "500");
        return array("responseStatus" => $responseStatus);
    }
}
function attemptViewRating($project_id, $user_id) {
	$connection = connectionToDataBase();

		if ($connection != null) {
			$sql = "SELECT grade FROM Grade WHERE project_id = '$project_id' AND user_id = '$user_id'";
			$result = $connection ->query($sql);
			$responseData = array();

			if($result ->num_rows != 0) {
	  			$responseStatus = array("status" =>"EXITO");

	  			while ($row = $result->fetch_assoc()) {
			    	array_push($responseData,array("rating" => $row["grade"]));
			    }
			    $connection -> close();
				return array("responseStatus"=>$responseStatus,"responseData"=>$responseData);
			}
			else {	
				$connection -> close();
				$responseStatus = array("status" => "EXITO");
				array_push($responseData,array("rating" => "You haven't rated this yet"));
				return array("responseStatus"=>$responseStatus,"responseData"=>$responseData);;
			}	
		}
		else {
			$responseStatus = array("status" => "500");
			return array("responseStatus"=>$responseStatus);;
		}
    $responseStatus = array("status" => "500");
    return array("responseStatus"=>$responseStatus);;
}
function attemptViewComments($id){
    $connection = connectionToDataBase();

		if ($connection != null) {
            $sql = "SELECT users.uPNombre, users.uApellidoP, comments.cDate, comments.comment From users JOIN comments ON users.user_id = comments.user_id WHERE comments.project_id = '$id' ORDER BY comments.cDate"; 
			//$sql = "SELECT * FROM Comments WHERE project_id = '$id'";
			$result = $connection ->query($sql);

			if($result ->num_rows > 0) {
	  			$responseStatus = array("status" =>"EXITO");
	  			$responseData = array();

	  			while ($row = $result->fetch_assoc()) {	
			    	array_push($responseData,array("primerNombre" => $row["uPNombre"], "segNombre" => $row["uApellidoP"], "date" => $row["cDate"], "comment" => utf8_encode($row["comment"])));
			    }
			    $connection -> close();
				return array("responseStatus"=>$responseStatus,"responseData"=>$responseData);
			}else if($result ->num_rows == 0){
                $responseStatus = array("status" => "EXITO");
                $responseData = array();
                
                array_push($responseData, array("primerNombre" => "No Comments", "segNombre" => "No Comments", "date" => "No Comments", "comment" => "No Comments"));
                $connection -> close();
				return array("responseStatus"=>$responseStatus,"responseData"=>$responseData);
            }
			else {	
				$connection -> close();
				$responseStatus = array("status" => "500");
				return array("responseStatus"=>$responseStatus);;
			}	
		}
		else {
			$responseStatus = array("status" => "500");
			return array("responseStatus"=>$responseStatus);;
		}
    $responseStatus = array("status" => "500");
    return array("responseStatus"=>$responseStatus);;
}

function attemptUpdateRating($project_id, $user_id, $rating) {
	$connection = connectionToDataBase();

		if ($connection != null) {
			$sql = "SELECT * FROM Grade WHERE project_id = '$project_id' AND user_id = '$user_id'";
			$result = $connection ->query($sql);

			if($result ->num_rows != 0) {
	  			$sql = "UPDATE Grade SET grade='$rating' WHERE project_id = '$project_id' AND user_id = '$user_id'";
	  			$result = $connection ->query($sql);
	  			if ($result === TRUE) {
	  				$responseStatus = array("status" =>"EXITO");
	  				$connection -> close();
					return array("status" => "EXITO", "responseStatus"=>$responseStatus);
	  			}
	  			else {
	  				$responseStatus = array("status" =>"500");
	  				$connection -> close();
					return array("status" => "500", "responseStatus"=>$responseStatus);
	  			}
			}
			else {	
				$sql = "INSERT INTO Grade (project_id, user_id, grade) VALUES ('$project_id', '$user_id', '$rating')";
	  			$result = $connection ->query($sql);
	  			if ($result === TRUE) {
	  				$responseStatus = array("status" =>"EXITO");
	  				$connection -> close();
					return array("status" => "EXITO", "responseStatus"=>$responseStatus);
	  			}
	  			else {
	  				$responseStatus = array("status" =>"500");
	  				$connection -> close();
					return array("status" => "500", "responseStatus"=>$responseStatus);
	  			}
			}	
		}
		else {
			$responseStatus = array("status" => "500");
			return array("status" => "500", "responseStatus"=>$responseStatus);;
		}
    $responseStatus = array("status" => "500");
    return array("status" => "500", "responseStatus"=>$responseStatus);;
}

function attemptInsertComment($user_id, $project_id, $text){
	$connection = connectionToDataBase();
		if ($connection != null) {
			$sql = "INSERT INTO comments (user_id, project_id, cDate, comment) VALUES ('$user_id', '$project_id', CURDATE(), '$text')";
			$result = $connection ->query($sql);
			if ($result == TRUE) {
				$responseStatus = array("status" =>"EXITO");
				$connection -> close();
				return array("status" => "EXITO");
			}
			else {
				$responseStatus = array("status" => "500");
                $connection -> close();
				return array("status" => "500");
			}
		}
		else {
			$responseStatus = array("status" => "500");
			return array("status"=> "500");
		}
	$responseStatus = array("status" => "500");
    return array("status"=>"500");
}

	function attemptCreaVirtualSample($dInicio,$dFin,$Current){
		$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');

			//$sqlVerifica = "SELECT * FROM virtualsample WHERE vsName = '$Nombre'";
			//$result = $conn->query($sqlVerifica); 

			//Verifica si no esta registrado ese correo antes
			//if ($result->num_rows > 0)//Double check
			//{
			//		$conn -> close();
			//		return array("status" => "Ese nombre ya esta registrado!");
			//	}
			//	else
			//{//Realiza el update de datos
				$sqlUpdate = "UPDATE virtualsample SET vsCurrent = false,Calificacion = false ,Registro = false";
				//$result = $conn->query($sqlVerifica); 
		        $sqlInsert = "INSERT INTO VirtualSample(vsStart_Date,vsEnd_Date,vsCurrent,Calificacion,Registro) VALUES ('$dInicio','$dFin',$Current,TRUE,TRUE) ";
		        //INSERT INTO VirtualSample(vsStart_Date,vsEnd_Date,vsCurrent,Calificacion,Registro) VALUES ('2017-10-8','2017-10-8',True,TRUE,TRUE)

		        if (mysqli_query($conn,$sqlUpdate) && mysqli_query($conn,$sqlInsert)){//True si se ejectua correcto
				    $conn-> close();
				    return array("status" => "SUCCESS");
				}
				else{//Error al hacer UPDATE en la BD
					$conn -> close();
					return array("status" => "ERROR al Crear VS");
				}

			    
			//}
		}else{//Error de conexion con BD
				$conn -> close();
				return array("status" => "Problema de conexion con la Base de datos, al crear VS");
		}
	}

	function attemptUpdateCalificacion($valor){
		$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');
			$sqlUpdate = "UPDATE virtualsample SET Calificacion = $valor WHERE vsCurrent = TRUE ";

	        if (mysqli_query($conn,$sqlUpdate)){//True si se ejectua correcto
			    $conn-> close();
			    return array("status" => "SUCCESS");
			}
			else{//Error al hacer UPDATE en la BD
				$conn -> close();
				return array("status" => "ERROR al Actualizar Calificacion VS");
			}

			    
			//}
		}else{//Error de conexion con BD
				$conn -> close();
				return array("status" => "Problema de conexion con la Base de datos, al Actualizar Calificacion VS");
		}
	}

	function attemptUpdateRegistro($valor){
		$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');
			$sqlUpdate = "UPDATE virtualsample SET Registro = $valor WHERE vsCurrent = TRUE ";

	        if (mysqli_query($conn,$sqlUpdate)){//True si se ejectua correcto
			    $conn-> close();
			    return array("status" => "SUCCESS");
			}
			else{//Error al hacer UPDATE en la BD
				$conn -> close();
				return array("status" => "ERROR al Actualizar Calificacion VS");
			}

			    
			//}
		}else{//Error de conexion con BD
				$conn -> close();
				return array("status" => "Problema de conexion con la Base de datos, al Actualizar Calificacion VS");
		}
	}


	function attemptLoadSamples(){
		$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');
			$sql = "SELECT * FROM virtualsample";
			$result = $conn->query($sql); 

			if ($result->num_rows <= 0){//Double check{
				$conn -> close();
				return array("status" => "VS no registrados!");
		    	//header('HTTP/1.1 406 User not found'); //Pre-Prepares a json file with mssg
		        //die("Wrong credentials provided!"); 
			}

	        if ($result->num_rows > 0)//Double check
			{
				$vs = array();	
				// output data of each row
			    while($row = $result->fetch_assoc()) 
			    {
			    	$response = array('ID' => $row['virtualSample_id'],
		    	 					'FechaInicio' => $row['vsStart_Date'], 
		    	 					'FechaFin' => $row['vsEnd_Date'], 
		    	 					'calif' => $row['Calificacion'], 
		    	 					'reg' => $row['Registro'], 
		    	 					'Current' => $row['vsCurrent']);   
			    	array_push($vs, $response);
			    	

				}
			    $conn-> close();
			    return array("status" => "SUCCESS","virtualsample" => $vs);
			}
			else
			{
				$conn -> close();
				return array("status" => "VirtualSample NOT FOUND");
			}

			    
			//}
		}else{//Error de conexion con BD
				$conn -> close();
				return array("status" => "Problema de conexion con la Base de datos, al Actualizar Calificacion VS");
		}
	}

	function attemptUpdateVS($Id){
			$conn = connectionToDataBase();

		if ($conn != null){
			$conn ->set_charset('utf8mb4');

				$sqlUpdate = "UPDATE virtualsample SET vsCurrent = false,Calificacion = false ,Registro = false";
				//$result = $conn->query($sqlVerifica); 
		        $sqlUpdate2 = "UPDATE virtualsample SET vsCurrent = true WHERE virtualSample_id = '$Id' ";
		        //INSERT INTO VirtualSample(vsStart_Date,vsEnd_Date,vsCurrent,Calificacion,Registro) VALUES ('2017-10-8','2017-10-8',True,TRUE,TRUE)

		        if (mysqli_query($conn,$sqlUpdate) && mysqli_query($conn,$sqlUpdate2)){//True si se ejectua correcto
				    $conn-> close();
				    return array("status" => "SUCCESS");
				}
				else{//Error al hacer UPDATE en la BD
					$conn -> close();
					return array("status" => "ERROR al cambiar Virtual Sample");
				}

			    
			//}
		}else{//Error de conexion con BD
				$conn -> close();
				return array("status" => "Problema de conexion con la Base de datos, al cambiar VS");
		}
	}
?>
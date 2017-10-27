

<?php
	
	function connectionToDataBase(){
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "conexionTec2";

		$conn = new mysqli($servername, $username, $password, $dbname);
		
		if ($conn->connect_error){
			return null;
		}
		else{
			return $conn;
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
			$sql = " SELECT * FROM Projecto WHERE project_id = '$pID' ";
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
		    	 					'Imagen' => $row["pImage"],
		    	 					'Area' => $row['pArea']);   
			    	//array_push($comments, $response);
			    	

				}
			    $conn-> close();
			    return array("status" => "SUCCESS","project" => $response);
			}
			else
			{
				$conn -> close();
				return array("status" => "Projecto NOT FOUND");
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

			$sqlVerifica = "SELECT * FROM Projecto WHERE project_id = '$pID'";
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
		        $sql = "UPDATE Projecto SET pNombre = '$Nombre',pDescripcion = '$Descripcion',pImage = '$Imagen',pArea = '$Area' WHERE project_id = '$pID' ";

		        if (mysqli_query($conn,$sql)){//True si se ejectua correcto
				    $conn-> close();
				    $datos = array('Pombre' => $Nombre,
		    	 					'email' => $Descripcion,
		    	 					'Imagen' => $Imagen,
		    	 					'Area' => $Area);  
				    return array("status" => "SUCCESS","projecto" => $datos);
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



?>
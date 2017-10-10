<?php
	header('Content-type: application/json');

	//test surver
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "ReginaGallardo11";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) 
	{
	    header('HTTP/1.1 500 Bad connection to Database');
	    die("The server is down, we couldn't establish the DB connection");
	}
	else
	{	
		switch ($_POST['ACTION']) {
		    case "STARTSESSION":
		        startSession();
		        break;
		    case "CHECKSESSION":
		        checkSession();
		        break;
		    case "ENDSESSION":
		        endSession();
		        break;
		}	 

		$conn->close();
	}
	function checkSession() {
    		session_start();

			if (isset($_SESSION["email"])){
				echo json_encode($_SESSION["email"]);
			}else{
		    	header('HTTP/1.1 406 User not logged in');
		        die("user is not logged in");
			}
		} 

	function startSession() {

		$username = $_POST['username']; // jalar usuario del ajax
				
		$sql = "SELECT email FROM Users WHERE username = '$username'"; // jalar email del usuario
		$result = $conn->query($sql);

		if ($result->num_rows > 0){
			session_start(); //iniciar session
			$row = $result->fetch_assoc()) 
			$response = $row['email']; //asignar email a la session
			$_SESSION["email"] = $row['email'] //guardar informacion en la session
			echo json_encode($response);// output data
		}else{
			header('HTTP/1.1 406 User not found');
			die("error, cannot connect to session");
		} 

	}

	function endSession() {
		session_start();
		session_destroy();

		if (session_status() == PHP_SESSION_NONE){
			echo json_encode("logged out");
		}else{
		    	header('HTTP/1.1 406 User not found');
		        die("failed to logout");
		}
	}
?>


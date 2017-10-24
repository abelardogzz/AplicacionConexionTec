<?php
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "conexionTec2";

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

		$email = $_POST['email'];
		
		$sql = "SELECT * FROM Users WHERE uEmail = '$email'";
		$result = $conn->query($sql);

		if($result->num_rows > 0)
		{
			header('HTTP/1.1 409 Conflict, Email already in use');
			die('Email already in use');
		}
		else
		{
			
			$password = $_POST['password'];
			$username = $_POST['username'];

			$hash = md5($password);



			
			$sql = "INSERT INTO Users(user_id,uPNombre, uApellidoP, uApellidoM, uPassword, uEmail,TipoDeUsuario,Deleted) VALUES (,'$username','$username' ,'$username' ,'$hash' , '$email','Admin',FALSE)";
	    	
	    	if (mysqli_query($conn, $sql)) 
	    	{
	    		session_start();
				$_SESSION["username"] = $email;
			    echo json_encode("New record created successfully");
			} 
			else 
			{
				header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
			    die("Error: " . $sql . "\n" . mysqli_error($conn));
			}
			
		}
	}


	$conn->close();
?>
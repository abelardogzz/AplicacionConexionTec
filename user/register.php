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

		$username = $_POST['username'];
		
		$sql = "SELECT username FROM Users WHERE username = '$username'";
		$result = $conn->query($sql);

		if($result->num_rows > 0)
		{
			header('HTTP/1.1 409 Conflict, Username already in use');
			die('Username already in use');
		}
		else
		{
			
			$password = $_POST['password'];
			$email = $_POST['email'];

			$hash = md5($password);



			
			$sql = "INSERT INTO Users (username, passwrd, email) VALUES ('$username', '$hash', '$email')";
	    	
	    	if (mysqli_query($conn, $sql)) 
	    	{
	    		session_start();
				$_SESSION["username"] = $username;
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
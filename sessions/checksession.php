<?php
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "conexionTec";

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
			session_start();

		if (isset($_SESSION["email"]))
		{

			echo json_encode($_SESSION["email"]);

		}
		else
		{
	    	header('HTTP/1.1 406 User not logged in');
	        die("user is not logged in");
		}
	} 

	$conn->close();
?>

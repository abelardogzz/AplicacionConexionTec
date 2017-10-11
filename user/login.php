<?php
	header('Content-type: application/json');

	//test server
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

		$username = $_POST['username'];
		$password = $_POST['password'];

		$hash = md5($password);
		//echo $userName;
		//echo $userPassword;
		
		$sql = "SELECT username, fName, lName FROM Users WHERE username = '$username' AND passwrd = '$hash'";
		$result = $conn->query($sql);
		//echo $result;

		//echo $result->num_rows;
		if ($result->num_rows > 0)
		{

		    while($row = $result->fetch_assoc()) 
		    {
		    	$response = array('fName' => $row['fName'], 'lName' => $row['lName']);   
			}

		    echo json_encode($response);
		    //echo json_encode($result->fetch_assoc());
		}
		else
		{
	    	header('HTTP/1.1 406 User not found');
	        die("the username or password you have provided are incorrect");
		}
	} 

	$conn->close();
?>
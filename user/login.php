<?php
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "ConexionTec";

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
		$password = $_POST['password'];

		//$hash = md5($password);
		$hash = $password;
		//echo $userName;
		//echo $userPassword;
		

		$sql = "SELECT * FROM Users WHERE uEmail = '$username' AND uPassword = '$hash'";
		$result = $conn->query($sql);
		//echo $result;

		//echo $result->num_rows;
		if ($result->num_rows > 0)
		{

			session_start();
			// output data of each row
		    while($row = $result->fetch_assoc()) 
		    {
		    	$response = array('fName' => $row['uPNombre'], 'lName' => $row['uApellidoP']);
		    	$_SESSION["current_id"] = $row['user_id'];
		    	$_SESSION["email"] = $row['uEmail'];   
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

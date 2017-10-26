<?php
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "ReginaGallardo11";

	$ipost = 0;
	$post = array();

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
		$word = $_POST['word'];
		//echo $userName;
		//echo $userPassword;

		$sql = "SELECT * FROM projects 
		WHERE projectName LIKE '%$word%'
		OR projectDescription LIKE '%$word%'
		OR projectCreator LIKE '%$word%'
		";
		$result = $conn->query($sql);


		//echo $result->num_rows;
		if ($result->num_rows > 0)
		{
			
			// output data of each row
		    while($row = $result->fetch_assoc()) 
		    {
		    	$response = array('projectName' => $row['projectName'], 'projectDescription' => $row['projectDescription'], 'projectCreator' => $row['projectCreator'], 'image' => $row['image1'], 'projectRating' => $row['projectRating'], 'projectID' => $row['projectID'], );
		    	
		    	array_push($post,$response);

			}
			echo json_encode($post);
			//echo ($response);
			
		    
		    //echo json_encode($result->fetch_assoc());
		}
		else
		{
	    	header('HTTP/1.1 406 User not found');
	        die("Wrong credentials provided!");
		}
	} 

	$conn->close();
?>

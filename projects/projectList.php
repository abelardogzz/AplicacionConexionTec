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
		$username = $_SESSION['username'];
		//echo $userName;
		//echo $userPassword;
		$sortMethod = $_POST['select'];

		switch ($sortMethod) {
		    case '1':
		        $sql = "SELECT * FROM projects ORDER BY submitDate DESC";
		        break;
		    case '2':
		        $sql = "SELECT * FROM projects ORDER BY submitDate ASC";
		        break;
		    case '3':
		        $sql = "SELECT * FROM projects ORDER BY projectRating DESC";
		        break;
		    case '4':
		        $sql = "SELECT * FROM projects ORDER BY submitDate ASC";
		        break;
		} 


		$result = $conn->query($sql);
		//echo $result->num_rows;


		//echo $result->num_rows;
		if ($result->num_rows > 0)
		{
			
			// output data of each row
		    while($row = $result->fetch_assoc()) 
		    {
		    	$response = array('projectName' => $row['projectName'], 'projectDescription' => $row['projectDescription'], 'projectCreator' => $row['projectCreator'], 'image' => $row['image1'], 'projectRating' => $row['projectRating'], 'projectID' => $row['projectID']);
		    	
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

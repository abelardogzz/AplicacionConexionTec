<?php
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "conexionTec";

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
		$load = $_POST['load'];

		switch ($load) {
		    case '1':
			    $sql = "SELECT pArea FROM project Group by pArea";

				$result = $conn->query($sql);
		    	if ($result->num_rows > 0)
				{
				    while($row = $result->fetch_assoc()) 
				    {
				    	$response = array('area' => $row['pArea']);
				    	array_push($post,$response);
					}
					echo json_encode($post);
				}
				else
				{
			    	header('HTTP/1.1 406 User not found');
			        die("Wrong credentials provided!");
				}
		        break;
		    case '2':
		    	$sql = "SELECT vsStart_Date, virtualSample_id FROM virtualsample";

				$result = $conn->query($sql);
		    	if ($result->num_rows > 0)
				{
				    while($row = $result->fetch_assoc()) 
				    {
				    	$response = array('vs' => $row['vsStart_Date'],'id' => $row['virtualSample_id']);
				    	array_push($post,$response);
					}
					echo json_encode($post);
				}
				else
				{
			    	header('HTTP/1.1 406 User not found');
			        die("Wrong credentials provided!");
				}	
		        break;
		}

	} 

	$conn->close();
?>

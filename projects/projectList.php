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
		$conn ->set_charset('utf8mb4');
		//session_start();
		//$username = $_SESSION['username'];
		//echo $userName;
		//echo $userPassword;
		$rate = $_POST['rating'];
		$rating = (int)$rate;
		$virts = $_POST['sample'];
		$vs = (int)$virts;
		$area = $_POST['area'];
		$word = $_POST['word'];

		if ($area == '0')
			$area = '';
		if ($vs == 0)
			$vs = '';

		        $sql = " SELECT * FROM(
				select t3.*, t1.ratings, coalesce(t2.com, 0) as com, t4.uPNombre,t4.uApellidoP
				from 
				    (SELECT * FROM project) t3
				left join
				    (SELECT users.user_id, users.uPNombre,users.uApellidoP FROM users)t4
				ON
				    t3.user_id = t4.user_id
				LEFT JOIN
				    (SELECT comments.project_id, COUNT(*) AS com FROM comments GROUP BY project_id) t2
				ON
				    t3.project_id = t2.project_id
				left join
				    (SELECT grade.project_id, AVG(grade) AS ratings FROM grade GROUP BY project_id) t1
				on
				    t1.project_id = t2.project_id
				)as projects 
				WHERE virtualSample_id LIKE '%$vs%'
					AND ratings >= $rating
				    AND pArea LIKE '%$area%'
				    AND (pNombre LIKE '%$word%'
						OR pDescripcion LIKE '%$word%'
				        OR pArea LIKE '%$word%'
				        OR uPNombre LIKE '%$word%'
				        OR uApellidoP LIKE '%$word%'
				    )
				group by project_id
		        ";
		       


		$result = $conn->query($sql);
		//echo $result->num_rows;


		//echo $result->num_rows;
		if ($result->num_rows > 0)
		{
			
			// output data of each row
		    while($row = $result->fetch_assoc()) 
		    {
		    	$response = array('rating' => $row['ratings'], 'projectName' => $row['pNombre'], 'projectDescription' => $row['pDescripcion'], 'creatorN' => $row['uPNombre'],'creatorLN' => $row['uApellidoP'], 'image' => $row['pImagen1'], 'projectID' => $row['project_id'], 'area' => $row['pArea'], 'vs' => $vs);
		    	
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

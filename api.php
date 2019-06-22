<?php 
	
	$conn = new mysqli("localhost", "root", "", "vuephpcrud");
	if ($conn->connect_error) {
		die("Database Could not Connected.");
	}


	$res = array('error' => false);

	
	$action = 'read';

	if (isset($_GET['action'])) {
		$action  = $_GET['action'];
	}

	if ($action == 'read') {
		$result = $conn->query("SELECT * FROM `users` ");
		$users = array();

		while ($row = $result->fetch_assoc()) {
			array_push($users, $row);
		}

		$res['users'] = $users;
	}


	if ($action == 'create') {
 
   			$username = $_POST['username'];
   			$email = $_POST['email'];
   			$mobile = $_POST['mobile'];
		

		$result = $conn->query("INSERT INTO `users` (`username`, `email`, `mobile`) VALUES('$username', '$email', '$mobile') ");
		
		if ($result) {
			$res['message'] = "User added successfully";
		}else{
			$res['error'] = true;
			$res['message'] = "User could not insert";
		}

	}


	if ($action == 'update') {
 			

   			$username = $_POST['username'];
   			$email = $_POST['email'];
   			$mobile = $_POST['mobile'];
   			$id = $_POST['id'];
		

		$result = $conn->query("UPDATE `users` SET `username` = '$username', `email` = '$email', `mobile` = '$mobile' WHERE `id` ='$id' ");
		
		if ($result) {
			$res['message'] = "User updated successfully";
		}else{
			$res['error'] = true;
			$res['message'] = "User could not updated";
		}

	}


	if ($action == 'delete') {
 			
   			$id = $_POST['id'];

		$result = $conn->query("DELETE FROM `users`  WHERE `id` ='$id' ");
		
		if ($result) {
			$res['message'] = "User Deleted successfully";
		}else{
			$res['error'] = true;
			$res['message'] = "User could not Deleted";
		}

	}







	$conn->close();

	header("Content-type: application/json");
	echo json_encode($res);
	die();
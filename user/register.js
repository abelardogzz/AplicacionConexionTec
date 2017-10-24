$(document).ready(function(){

// CHECK SESSION
alert("got the file")

			$.ajax({

		                url : "../sessions/checksession.php",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                	 window.location.replace("../profile.html");
		                },
		                error : function(errorMessage){

		                }

		            });

// CHECK IF ALL DATA IS ENTERED

	$("#register").on("click", function(){

		var $username = $("#username");
		var $password = $("#password");
		var $passwordConfirmation = $("#passwordConfirmation");
		var $email = $("#email");

		var $full = true;

		if ($username.val() == ""){
			$("#checkUsername").text("Please provide your username");
			$full = false;
		}
		else{
			$("#checkUsername").text("");
		}

		if ($password.val() == ""){
			$("#checkPassword").text("Please provide your password");
			$full = false;
		}
		else{
			$("#checkPassword").text("");
		}

		if ($passwordConfirmation.val() == ""){
			$("#checkPasswordConfirmation").text("Please confirm your password");
			$full = false;
		}
		else{
			$("#checkPasswordConfirmation").text("");
		}

		if ($passwordConfirmation.val() != "" && $password.val() != "" && $password.val() != $passwordConfirmation.val()){
			$("#checkPasswordConfirmation").text("your passwords do not match");
			$full = false;
		}

		if ($email.val() == ""){
			$("#checkEmail").text("Please provide your email");
			$full = false;
		}
		else{
			$("#checkEmail").text("");
		}

//IF DATA COMPLETE, REGISTER

		if($full){
			var jsonToSend = {
		                    "username" : $("#username").val(),
		                    "password" : $("#password").val(),
		                    "email" : $("#email").val(), 
		                };

		                $.ajax({
		                    url : "register.php",
		                    type : "POST",
		                    data : jsonToSend,
		                    dataType : "json",
		                    contentType : "application/x-www-form-urlencoded",
		                    success: function(jsonResponse){
		                        alert("Registration succesfull");
		                        window.location.replace("../profile.html");
		                    },
		                    error : function(errorMessage){
		                        alert(errorMessage.responseText);
		                    }

		                });
		}

	});

});




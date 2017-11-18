$(document).ready(function(){
	     $(document).bind('keypress', function(e) {
            if(e.keyCode==13){
                 $('#register').trigger('click');
             }
        });


// CHECK SESSION
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

		var $name = $('#name');
		var $lastName = $('#lastName');
		var $username = $("#username");
		var $password = $("#password");
		var $passwordConfirmation = $("#passwordConfirmation");
		var $email = $("#email");

		var $full = true;

		if ($name.val() == ""){
			$("#checkName").text("Please provide your Name");
			$full = false;
		}
		else{
			$("#checkName").text("");
		}

		if ($lastName.val() == ""){
			$("#checkLastName").text("Please provide your last name");
			$full = false;
		}
		else{
			$("#checkLastName").text("");
		}

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
							"name" : $("#name").val(),
							"lastName" : $("#lastName").val(),
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




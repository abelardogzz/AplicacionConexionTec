$(document).ready(function(){
	//link enter to submit
		$(document).bind('keypress', function(e) {
            if(e.keyCode==13){
                 $('#login').trigger('click');
             }
        });

		//check session
			$.ajax({

		                url : "../sessions/checksession.php",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                	 window.location.replace("../profile.html");
		                },
		                error : function(errorMessage){
		                }

		            });
//when submit clicked

	$("#login").on("click", function(){
		//check all fields have been filled

		var $email = $("#email");
		var $password = $("#password");
		var $full = true;
		
		if ($email.val() == ""){
			$("#checkEmail").text("Please provide your username");
			$full = false;
		}
		else{
			$("#checkEmail").text("");
		}

		if ($password.val() == ""){
			$("#checkPassword").text("Please provide your password");
			$full = false;
		}
		else{
			$("#checkPassword").text("");
		}

		//check if username and password exist and are correct

		if($full){
			var jsonToSend = {
		                "email" : $("#email").val(),
		                "password" : $("#password").val()
		            };

		            $.ajax({

		                url : "login.php",
		                type : "POST",
		                data : jsonToSend,
		                dataType : "json",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                	//if correct go to profile
		                    window.location.replace("../projects.html");
		                },
		                error : function(errorMessage){
		                    alert(errorMessage.responseText);
		                }

		            });
		}


	});

});
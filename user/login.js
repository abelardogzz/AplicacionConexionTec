$(document).ready(function(){


			$.ajax({

		                url : "../sessions/checksession.php",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                	 window.location.replace("../profile.html");
		                },
		                error : function(errorMessage){
		                }

		            });


	$("#login").on("click", function(){

		var $username = $("#username");
		var $password = $("#password");
		var $full = true;
		
		if ($username.val() == ""){
			$("#checkUserName").text("Please provide your username");
			$full = false;
		}
		else{
			$("#checkUserName").text("");
		}

		if ($password.val() == ""){
			$("#checkPassword").text("Please provide your password");
			$full = false;
		}
		else{
			$("#checkPassword").text("");
		}

		if($full){
			var jsonToSend = {
		                "username" : $("#username").val(),
		                "password" : $("#password").val()
		            };

		            $.ajax({

		                url : "login.php",
		                type : "POST",
		                data : jsonToSend,
		                dataType : "json",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                    window.location.replace("../profile.html");
		                },
		                error : function(errorMessage){
		                    alert(errorMessage.responseText);
		                }

		            });
		}


	});

});
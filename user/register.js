$(document).ready(function(){

// CHECK IF ALL DATA IS ENTERED

	$("#register").on("click", function(){

			var jsonToSend = {
		                    "firstName" : $("#firstName").val(),
		                    "lastName" : $("#lastName").val(),
		                    "username" : $("#username").val(),
		                    "password" : $("#password").val(),
		                    "email" : $("email").val(),
		                };

		                $.ajax({
		                    url : "php/register.php",
		                    type : "POST",
		                    data : jsonToSend,
		                    dataType : "json",
		                    contentType : "application/x-www-form-urlencoded",
		                    success: function(jsonResponse){
		                        alert("Registration succesfull");
		                        window.location.replace("home.html");
		                        //aqui debe mandar llamar la funcion iniciar session
		                    },
		                    error : function(errorMessage){
		                        alert(errorMessage.responseText);
		                    }

		                });
		});

	});



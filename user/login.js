$(document).ready(function(){


	$("#login").on("click", function(){

			var jsonToSend = {
		                "username" : $("#username").val(),
		                "password" : $("#password").val()
		            };

		            $.ajax({

		                url : "php/login.php",
		                type : "POST",
		                data : jsonToSend,
		                dataType : "json",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                    window.location.replace("home.html");
		                    //aqui deberia llamar funcion de iniciar session
		                },
		                error : function(errorMessage){
		                    alert(errorMessage.responseText);
		                }

		            });


	});

});
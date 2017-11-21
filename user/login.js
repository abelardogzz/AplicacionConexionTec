$(document).ready(function(){
	//link enter to submit
		$('#email').bind('keypress', function(e) {
            if(e.keyCode==13){
                 $('#login').trigger('click');
             }
        });
        $('#password').bind('keypress', function(e) {
            if(e.keyCode==13){
                 $('#login').trigger('click');
             }
        });

		//check session
			$.ajax({

		                url : "../sessions/checksession.php",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                	alert("There is no session");
		                	 console.log(jsonResponse);
		                	 window.location.replace("../profile.html");
		                },
		                error : function(errorMessage){
		                }

		            });
//when submit clicked

	$("#login").on("click", function(){

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


	});

});


$(document).ready(function(){

	$("#logout").on("click", function(){

			$.ajax({

		                url : "sessions/destroySession.php",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                    window.location.replace("user/sign_in.html");
		                },
		                error : function(errorMessage){
		                    alert(errorMessage.responseText);
		                }

		            });
			
	});

});
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
		alert($("#name").val());
		alert($("#lastName").val());

			var jsonToSend = {
							"name" : $("#name").val(),
							"lastName" : $("#lastName").val(),
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
		                        window.location.replace("../projects.html");
		                    },
		                    error : function(errorMessage){
		                        alert(errorMessage.responseText);
		                    }

		                });

	});

});




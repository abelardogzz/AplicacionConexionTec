$(document).ready(function(){

			//funcion iniciar session
		function startSession() {
			var jsonToSend = {
		                "username" : $("#username").val(),
		                "ACTION" : "STARTSESSION"
		            };

		            $.ajax({

		                url : "php/session.php",
		                type : "POST",
		                data : jsonToSend,
		                dataType : "json",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                    alert("session started");
		                },
		                error : function(errorMessage){
		                    alert(errorMessage.responseText);
		                }

		            });
		}

		//funcion cerrar session

		function endSession() {
			var jsonToSend = {
		                "username" : $("#username").val(),
		                "ACTION" : "ENDSESSION"
		            };

		            $.ajax({

		                url : "php/session.php",
		                type : "POST",
		                data : jsonToSend,
		                dataType : "json",
		                contentType : "application/x-www-form-urlencoded",
		                success: function(jsonResponse){
		                    alert("session ended");
		                },
		                error : function(errorMessage){
		                    alert(errorMessage.responseText);
		                }

		            });
		}

		//funcion checar session

		function checkSession() {

			var jsonToSend = {
			                "ACTION" : "CHECKSESSION"
			            };
			$.ajax({

			                url : "php/session.php",
			                type : "POST",
			                data : jsonToSend,
			                dataType : "json",
			                contentType : "application/x-www-form-urlencoded",
			                success: function(jsonResponse){
			                	alert("session exists")
			                },
			                error : function(errorMessage){
			                }

			            });
		}

});
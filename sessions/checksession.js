$(document).ready(function(){

            $.ajax({

                        url : "checksession.php",
                        contentType : "application/x-www-form-urlencoded",
                        success: function(jsonResponse){
                            //alert("There is a session");
                            console.log(jsonResponse);
                        },
                        error : function(errorMessage){
                            alert("Inicia Sesion para ver detalles.");
                            window.location.replace("./user/sign_up.html");
                        }

                    });

});
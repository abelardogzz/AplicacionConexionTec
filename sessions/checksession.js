$(document).ready(function(){

            $.ajax({

                        url : "checksession.php",
                        contentType : "application/x-www-form-urlencoded",
                        success: function(jsonResponse){
                        },
                        error : function(errorMessage){
                            alert("please log in");
                            window.location.replace("../user/sign_up.html");
                        }

                    });

});
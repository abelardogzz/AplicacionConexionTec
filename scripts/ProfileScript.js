$(document).ready(function(){
	//Agregar los archivos de Sessiones
$.ajax({

                        url : "./sessions/checksession.php",
                        contentType : "application/x-www-form-urlencoded",
                        success: function(jsonResponse){
                            alert("There is a session");
                            console.log(jsonResponse);
                            
                        },
                        error : function(errorMessage){
                            alert("There is no session");
                            window.location.replace("./user/sign_in.html");
                            console.log(errorMessage);
                            
                        }
        });

var jsonToSend = {
                "action" : "LOADPROFILE",
                "email" : ""
        };

    $.ajax({
        url:"./data/applicationLayer.php",
        type: "POST", <!--GET|POST|PUT-->
        data: jsonToSend,
        dataType: "json",
        contentType : "application/x-www-form-urlencoded", /** Espesify bc default xml and it reads diferently*/
        success: function(jsonData){
            /*On success, it returns an array of objects*/
            console.log(jsonData);
            $('#dshowProfile').append(" nombre: ");
            $('#dshowProfile').append(jsonData.Pnombre);
            $('#dshowProfile').append("\n Apellidos: ");
            $('#dshowProfile').append(jsonData.ApellidoP);
            $('#dshowProfile').append(" ");
            $('#dshowProfile').append(jsonData.ApellidoM);
            $('#dshowProfile').append("\n Email: ");
            $('#dshowProfile').append(jsonData.email);

        },
        error: function(errMessage){
            //alert("ERROR IN Load PROFILE");
                //alert(errorMessage.responseText);
            alert("Error " + errMessage.responseText);
            console.log(errMessage);
            console.log(sess);
        }
    });

$("#EditBtn").on("click", function(){
    window.location.replace("user/edit.html");
});

});

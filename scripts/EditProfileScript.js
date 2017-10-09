$(document).ready(function(){

    

    $("#EditProfile").on("click",function(){

        //Datos actializados del usuario para hacer cambios
        var jsonToSend = {
                "action" : "EDITPROFILE"
        };

        url:"data/applicationLayer.php",
        type: "POST", <!--GET|POST|PUT-->
        data: jsonToSend,
        dataType: "json",
        contentType : "application/x-www-form-urlencoded", /** Espesify bc default xml and it reads diferently*/
        success: function(jsonData){
            /*On success, it returns an array of objects*/
            console.log(jsonData);
            
            
            //Mensaje de alerta con el resultado
            //Return para notificar.
            //window.location.replace("profile.html");
            
            

        },
        error: function(errMessage){
            alert("ERROR IN PROFILE");
                //alert(errorMessage.responseText);
            alert(errMessage.statusText);
            console.log(errMessage);
        }
    });


});

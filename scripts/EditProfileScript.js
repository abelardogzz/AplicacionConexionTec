$(document).ready(function(){

    //AgregarScripts de sesiones
    //Carga el perfil para ponerlo en los campos 
    //Modifica los campos y al darle "save" se actualiza
    var jsonToSend = {
                "action" : "LOADPROFILE",
                "email" : $_SESSION["email"]
        };

    $.ajax({
        url:"data/applicationLayer.php",
        type: "POST", <!--GET|POST|PUT-->
        data: jsonToSend,
        dataType: "json",
        contentType : "application/x-www-form-urlencoded", /** Espesify bc default xml and it reads diferently*/
        success: function(jsonData){
            /*On success, it returns an array of objects*/
            console.log(jsonData);
            $("#ieditNombre").val(jsonData.PNombre);
            $("#ieditApellidoP").val(jsonData.ApellidoP) ;
            $("#ieditApellidoM").val(jsonData.ApellidoM );
            $("#iedituserName").val(jsonData.username );
            $("#ieditEmail").val(jsonData.email);

                      

        },
        error: function(errMessage){
            alert("ERROR IN Load PROFILE");
                //alert(errorMessage.responseText);
            alert(errMessage.statusText);
            console.log(errMessage);
        }
    });

    $("#editBtn").on("click",function(){

        //Datos actializados del usuario para hacer cambios
        var jsonToSend = {
                "action" : "EDITPROFILE",
                "Nombre":$("#ieditNombre").val(),
                "ApellidoP" : $("#ieditApellidoP").val(),
                "ApellidoM" : $("#ieditApellidoM").val( ),
                "username" :  $("#iedituserName").val( ),
                "email" :  $("#ieditEmail").val()
        };

        url:"data/applicationLayer.php",
        type: "POST", <!--GET|POST|PUT-->
        data: jsonToSend,
        dataType: "json",
        contentType : "application/x-www-form-urlencoded", /** Espesify bc default xml and it reads diferently*/
        success: function(jsonData){
            /*On success, it returns an array of objects*/
            console.log(jsonData);
            if( jsonData.status == "SUCCESS"){
                //window.location.replace("profile.html");
            }
            else{
                alert("Error al actualizar los campos");
            }
            
            //Mensaje de alerta con el resultado
            //Return para notificar.
            
            
            

        },
        error: function(errMessage){
            alert("ERROR IN Edit");
                //alert(errorMessage.responseText);
            alert(errMessage.statusText);
            console.log(errMessage);
        }
    });


});

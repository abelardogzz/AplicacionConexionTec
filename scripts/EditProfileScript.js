$(document).ready(function(){

    //AgregarScripts de sesiones
    //Carga el perfil para ponerlo en los campos 
    //Modifica los campos y al darle "save" se actualiza

    var jsonToSend = {
                "action" : "LOADPROFILE",
                "email" : $_SESSION["username"]
        };
    $.ajax({
        url:"../data/applicationLayer.php",
        type: "POST", <!--GET|POST|PUT-->
        data: jsonToSend,
        dataType: "json",
        contentType : "application/x-www-form-urlencoded", 
        success: function(jsonData){
            //On success, it returns an array of objects
            console.log(jsonData);
            $("#ieditNombre").val(jsonData.Pnombre);
            $("#ieditApellidoP").val(jsonData.ApellidoP) ;
            $("#ieditApellidoM").val(jsonData.ApellidoM );
            $("#iedituserName").val(jsonData.username );
            $("#ieditEmail").val(jsonData.email);

                      

        },
        error: function(errMessage){
            alert("ERROR IN Load PROFILE");
                //alert(errorMessage.responseText);
            alert(errMessage.responseText);
            console.log(errMessage);
        }
    });

        
    $("#BtnEdit").on("click",function(){
        alert("Editando proyecto!");
        //Datos actializados del usuario para hacer cambios
        var jsonToSend = {
                "action" : "EDITPROFILE",
                "Nombre": $("#ieditNombre").val(),
                "ApellidoP" : $("#ieditApellidoP").val(),
                "ApellidoM" : $("#ieditApellidoM").val(),
                "username" :  $("#iedituserName").val(),
                "email" :  $("#ieditEmail").val()
        };
        $.ajax({
            url:"../data/applicationLayer.php",
            type: "POST", <!--GET|POST|PUT-->
            data: jsonToSend,
            dataType: "json",
            contentType : "application/x-www-form-urlencoded", 
            success: function(jsonData){
                //On success, it returns an array of objects
                console.log(jsonData);
                if( jsonData.status == "SUCCESS"){
                    //window.location.replace("profile.html");
                    alert("Se Edito con exito!");
                    console.log(jsonData.profile);
                }
                else{
                    alert("Error al actualizar los campos");
                    alert(jsonData.status);
                }
                
                //Mensaje de alerta con el resultado
                //Return para notificar.
            },
            error: function(errMessage){
                alert("ERROR IN Edit");
                    //alert(errorMessage.responseText);
                alert(errMessage.responseText);
                console.log(errMessage);
            }
        });
    });
});

$(document).ready(function(){
    //var url = window.location.href;
    //alert(url.substr(url.indexOf("Q")+2));
$.ajax({

    url : "../sessions/checksession.php",
    contentType : "application/x-www-form-urlencoded",
    success: function(jsonResponse){
        alert("There is a session");
        console.log(jsonResponse);
        
    },
    error : function(errorMessage){
        alert("There is no session");
        window.location.replace("../profile.html");
        console.log(errorMessage);
        
    }
});

    var jsonToSend = {
                "action" : "LOADPROFILE"
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
            $("#ieditNombre").removeAttr("disabled");
            $("#ieditNombre").val(jsonData.Pnombre);

            $("#ieditApellidoP").removeAttr("disabled");
            $("#ieditApellidoM").removeAttr("disabled");
            $("#ieditApellidoP").val(jsonData.ApellidoP) ;
            $("#ieditApellidoM").val(jsonData.ApellidoM );

            $("#ieditEmail").removeAttr("disabled");
            $("#ieditEmail").val(jsonData.email);


        },
        error: function(errMessage){
            alert("ERROR al editar PROFILE");
                //alert(errorMessage.responseText);
            alert(errMessage.responseText);
            console.log(errMessage);
        }
    });

        
    $("#BtnEdit").on("click",function(){
        //alert("Editando proyecto!");
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
                    alert("Se Edito el perfil con exito!");

                    console.log(jsonData.profile);
                    window.location.replace("../profile.html");
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



    $("#Perfil").on('click',function(){

        window.location.replace("../profile.html");
    });

});

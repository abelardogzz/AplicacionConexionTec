$(document).ready(function(){
    //AgregarScripts de sesiones
    //Carga el perfil para ponerlo en los campos 
    //Modifica los campos y al darle "save" se actualiza
    aux = window.location.href
    id = aux.substring(aux.lastIndexOf('=')+1);
    //alert(id);


    var loadProjects = { "action" : "LOADPROJECT", "projectID" : id};
    $.ajax({
        url : "../data/applicationLayer.php",
        type : "POST",
        data: loadProjects,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(data){


                 $("#ieditNombre").val(data.Nombre);
                $("#ieditDescripcion").val(data.Descripcion);
                 $("#ieditImagen").val(data.Imagen);
                $("#ieditArea").val(data.Area); 
                $("#ieditProjectID").val(id) ;
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
  
    $("#BtnEdit").on("click",function(){
        alert("Editando proyecto!");
        //Datos actializados del usuario para hacer cambios
        var jsonToSend = {
                "action" : "EDITPROJECT",
                "Nombre": $("#ieditNombre").val(),
                "Descripcion" :  $("#ieditDescripcion").val(),
                "Imagen" : $("#ieditImagen").val(), 
                "Area" : $("#ieditArea").val(), 
                
                "ID" :  $("#ieditProjectID").val() 
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
                    alert("Se Edito Projecto con exito!");
                    console.log(jsonData.projecto);
                    window.location.replace("../profile.html");
                }
                else{
                    alert("Error al actualizar los campos Del projecto");
                    alert(jsonData.status);
                }
                
                //Mensaje de alerta con el resultado
                //Return para notificar.
            },
            error: function(errMessage){
                alert("ERROR IN Edit Project");
                    //alert(errorMessage.responseText);
                alert(errMessage.responseText);
                console.log(errMessage);
            }
        });
    });

});




$(document).ready(function(){

    //AgregarScripts de sesiones
    //Carga el perfil para ponerlo en los campos 
    //Modifica los campos y al darle "save" se actualiza

    var jsonToSend = {
                "action" : "LOADPROJECT",
                "projectID" : 1 
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
            /*
            $("#ieditNombre").val(jsonData.Nombre);
            $("#ieditDescripcion").val(jsonData.Descripcion);
            $("#ieditProjectID").val(jsonData.ID); //Este tiene que estar hidden en el HTML
            $("#ieditArea").val(jsonData.Area); 
*/
                      

        },
        error: function(errMessage){
            alert("ERROR al Cargar Proyecto");
                //alert(errorMessage.responseText);
            alert(errMessage.responseText);
            console.log(errMessage);
        }
    });
/*  
    $("#BtnEdit").on("click",function(){
        alert("Editando proyecto!");
        //Datos actializados del usuario para hacer cambios
        var jsonToSend = {
                "action" : "EDITPROJECT",
                "Nombre": $("#ieditNombre").val(),
                "Descripcion" :  $("#ieditDescripcion").val(),
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
    */
});

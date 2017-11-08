$(document).ready(function(){
    //AgregarScripts de sesiones
    //Carga el perfil para ponerlo en los campos 
    //Modifica los campos y al darle "save" se actualiza
    
    var loadProjects = { "action" : "GETPROJECT"};
    $.ajax({
        url : "../data/applicationLayer.php",
        type : "POST",
        data: loadProjects,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonReceived){
            var projects = jsonReceived;
            console.log(projects);
            var listaProjects = "";
            var projectsID = [];
            console.log(projects.length);
            for(var i = 0; i < projects.length; i++){
                listaProjects += 
                        '<tr>' +
                        '<td>' + projects[i].projectID + '</td>' +
                        '<td>' + projects[i].virtualSampleID + '</td>' +
                        '<td>' + projects[i].userID + '</td>' +
                        '<td>' + projects[i].pNombre + '</td>' +
                        '<td> <button class="viewProject" id="'+ projects[i].projectID +'" type="submit" value="'+ projects[i].projectID +'">Ver Proyecto</button> </td>' + 
                        '</tr>'   
            }
            $("#projectTable").append(listaProjects);
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
    $(".viewProject").on("click", verProyecto);

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
            
            $("#ieditNombre").val(jsonData.Nombre);
            $("#ieditDescripcion").val(jsonData.Descripcion);
            $("#ieditImagen").val(jsonData.Imagen);
            $("#ieditProjectID").val(jsonData.ID); //Este tiene que estar hidden en el HTML
            $("#ieditArea").val(jsonData.Area); 

                      

        },
        error: function(errMessage){
            alert("ERROR al Cargar Proyecto");
                //alert(errorMessage.responseText);
            alert(errMessage.responseText);
            console.log(errMessage);
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
function verProyecto(){
    var getId = $(this).val();
    $(location).attr('href', 'show.html?id='+ getId);
}

function verProyecto2() {
    var verProyectoJson = {
        "action" : "VIEWPROJECT",
        "id" : $(".viewProject").val()
    };
    console.log(verProyectoJson);
    $.ajax({
        url: "../data/applicationLayer.php",
        type: "POST",
        data: verProyectoJson,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(jsonReceived){
            window.location.href = "show_project.html?id='jsonReceived.'";
            
        },
        error: function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
}

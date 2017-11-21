$(document).ready(function(){
	//Agregar los archivos de Sessiones



var jsonToSend = {
                "action" : "LOADPROFILE"
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
            newhtml = ""
            newhtml += "Nombre: "+jsonData.Pnombre+"</br>";
            newhtml += "Apellido Paterno: "+jsonData.ApellidoP+"</br> ";
            newhtml += "Email: "+jsonData.email+"</br> ";
            
            $('#dshowProfile').append(newhtml);

        },
        error: function(errMessage){
            alert("ERROR IN Load PROFILE");
                //alert(errorMessage.responseText);
            alert(errMessage.responseText);
            console.log(errMessage);
        }
    });


    var jsonToSend = {
                "action" : "LOADPERSONALPROJECTS"
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
            newhtml = "";
            for (var x in jsonData){
                newhtml += "<tr>";
                newhtml += "<td>"+ jsonData[x].Nombre +"\t </td>";
                newhtml += "<td>"+ jsonData[x].Descripcion +"\t</td>";
                newhtml += "<td>"+ jsonData[x].area +"\t </td>";
                newhtml += "<td><input type=\"radio\" name=\"projectToedit\" id=\""+jsonData[x].ID+"\" value=\""+jsonData[x].ID+"\" /> ";
                newhtml += "</tr>";
            }

            
            $('#Projectos').append(newhtml);

        },
        error: function(errMessage){
            alert("ERROR IN Load PROFILE");
                //alert(errorMessage.responseText);
            alert(errMessage.responseText);
            console.log(errMessage);
        }
    });






    $("#BtnEdita").on('click',function(){

        window.location.replace("user/edit.html");
    });
    $("#projectos").on('click',function(){

        window.location.replace("projects.html");
    });
    $("#btnEditProjecto").on('click',function(){
        var radioValue = $("input[name='projectToedit']:checked").val();
        //alert(radioValue);
        window.location.replace("projects/edit_project.html?id="+radioValue);
    });



});

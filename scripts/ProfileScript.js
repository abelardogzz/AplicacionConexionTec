$(document).ready(function(){
	//Agregar los archivos de Sessiones



var jsonToSend = {
                "action" : "LOADPROFILE",
                "username" : $_SESSION["username"]
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
            $('#dshowProfile').append(jsonData.Pnombre);
            $('#dshowProfile').append(jsonData.ApellidoP);
            $('#dshowProfile').append(jsonData.ApellidoM);
            $('#dshowProfile').append(jsonData.username);
            $('#dshowProfile').append(jsonData.email);

        },
        error: function(errMessage){
            alert("ERROR IN Load PROFILE");
                //alert(errorMessage.responseText);
            alert(errMessage.statusText);
            console.log(errMessage);
        }
    });

/*
    $("#HomePage").on("click",function(){
        window.location.replace("home.php");
    });

    $("#FriendsPage").on("click",function(){
        window.location.replace("friends.php");
    });
*/

});

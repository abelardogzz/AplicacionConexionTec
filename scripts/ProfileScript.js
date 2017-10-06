$(document).ready(function(){
	
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
            /*
                var newhtml ="";
                newhtml += " <b>Name:</b> "+ jsonData.fName + " "+
                             jsonData.lName + "</br> "+
                            " <b>User Name:</b> " + jsonData.username + "</br> "+
                            " <b>Email:</b> " +jsonData.email + "</br> ";
                if(jsonData.gender == "M"){
                    newhtml += " <b>Gender:</b> Masculine </br>";
                }
                else{
                   newhtml += " <b>Gender:</b> Femenine </br>"; 
                }

                newhtml+= "<b>Country:</b>" + jsonData.country ;
            */
                $("#UserProfile").append(newhtml);
            

        },
        error: function(errMessage){
            alert("ERROR IN PROFILE");
                //alert(errorMessage.responseText);
            alert(errMessage.statusText);
            console.log(errMessage);
        }
    });

    $("#EditProfile").on("click",function(){

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
            /*
                var newhtml ="";
                newhtml += " <b>Name:</b> "+ jsonData.fName + " "+
                             jsonData.lName + "</br> "+
                            " <b>User Name:</b> " + jsonData.username + "</br> "+
                            " <b>Email:</b> " +jsonData.email + "</br> ";
                if(jsonData.gender == "M"){
                    newhtml += " <b>Gender:</b> Masculine </br>";
                }
                else{
                   newhtml += " <b>Gender:</b> Femenine </br>"; 
                }

                newhtml+= "<b>Country:</b>" + jsonData.country ;
            */
            
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


/*
    $("#HomePage").on("click",function(){
        window.location.replace("home.php");
    });

    $("#FriendsPage").on("click",function(){
        window.location.replace("friends.php");
    });
*/

});

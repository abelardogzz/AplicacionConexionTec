$(document).ready(function(){  

     $('#searchbox').bind('keypress', function(e) {
            if(e.keyCode==13){
                 $('#doSearch').trigger('click');
             }
        });

    var jsonToSend = {
                    "load" : 1
                };


    $.ajax ({
            url : "projects/loadfilters.php",
            type : "POST",
            dataType : "json",
            data : jsonToSend,
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResp){
                var newHtml = "";
                idPost = jsonResp.length;
                for(i = 0; i < jsonResp.length; i++){
                   newHtml += "<option name='area' value='" + jsonResp[i].area + "'> " + jsonResp[i].area + "</option> "; 
                }

                $("#area").append(newHtml);

            },
            error: function(errorMsg){
                 console.log(errorMsg.statusText);
            }
        });

    var jsonToSend = {
                    "load" : 2
                };


    $.ajax ({
            url : "projects/loadfilters.php",
            type : "POST",
            dataType : "json",
            data : jsonToSend,
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResp){
                var newHtml = "";
                idPost = jsonResp.length;
                for(i = 0; i < jsonResp.length; i++){
                   newHtml += "<option name='virtualSample' value='" + jsonResp[i].id + "'> " + jsonResp[i].vs + "</option> "; 
                }

                $("#virtualSample").append(newHtml);

            },
            error: function(errorMsg){
                console.log(errorMsg.statusText);
            }
        });

// POST USERS
      setTimeout(function(){
        $('#doSearch').trigger('click');

      },10);
      
      $('select').on('change', function (e){
          $('#doSearch').trigger('click');
      });
   

    $("#doSearch").on("click", function(){

      var $word = $("#searchbox");
      $("#sProjectList").empty();
  
        var jsonToSend = {
                    "word" : $("#searchbox").val(),
                    "sort" : $("[name=sort]:selected").val(),
                    "rating" : $("[name=grade]:selected").val(),
                    "area" : $("[name=area]:selected").val(),
                    "sample" : $("[name=virtualSample]:selected").val(),
                };

            $.ajax({
                        url : "projects/projectList.php",
                        type : "POST",
                        data : jsonToSend,
                        dataType : "json",
                        contentType : "application/x-www-form-urlencoded",
                        success: function(jsonResp){
                          var newHtml = "";
                idPost = jsonResp.length;
                for(i = 0; i < jsonResp.length; i++){

                   newHtml += "<div>" + "<img name='pPicture' src='" + jsonResp[i].image + "''>";
                   newHtml += "<h4>" + jsonResp[i].projectName + "</h4>";
                   newHtml += "<p> Rating: " + jsonResp[i].rating;
                   //for(i = 0; i < parseInt(jsonResp.projectRating); i++)
                    //newHtml += "*";
                   newHtml += "</p>";
                   newHtml += "<p> description: " + jsonResp[i].projectDescription + "</p>";
                   newHtml += "<p> Area: " + jsonResp[i].area + "</p>";
                   newHtml += "<p> created by: " + jsonResp[i].creatorN + " " + jsonResp[i].creatorLN + "</p> </div>" ;
                   newHtml += "<input id= '" + jsonResp[i].projectID + "' class='viewProject' type='Submit' value='Ver Proyecto'></div> ";

                          }

                          $("#sProjectList").html(newHtml);
                        },
                        error : function(errorMessage){
                            var newHtml = "";
                            newHtml += "<div> NO RESULTS WERE FOUND </div> ";
                            $("#sProjectList").html(newHtml);
                        }

                    });
      
    });
    $(document).on('click', '.viewProject', verProyecto);


});

function verProyecto(){
    var getId = $(this).attr('id');
    $(location).attr('href', 'projects/show.html?id='+ getId);
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
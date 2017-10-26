$(document).ready(function(){

// POST USERS
                var jsonToSend = {
                    "select" : $("[name=sort]:selected").val()
                };
		$.ajax ({

            
            url : "projects/projectList.php",
            type : "POST",
            dataType : "json",
            data : jsonToSend,
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonResp){
                var newHtml = "";
                idPost = jsonResp.length;
                for(i = 0; i < jsonResp.length; i++){

                   newHtml += "<div>" + "<img id='profilePicture' src='" + jsonResp[i].image + "''>";
                   newHtml += "<h4>" + jsonResp[i].projectName + "</h4>";
                   newHtml += "<p> Rating: " + jsonResp[i].projectRating;
                   //for(i = 0; i < parseInt(jsonResp.projectRating); i++)
                   	//newHtml += "*";
                   newHtml += "</p>";
                   newHtml += "<p> description: " + jsonResp[i].projectDescription + "</p>";
                   newHtml += "<p> created by: " + jsonResp[i].projectCreator + "</p> </div>" ;
                   newHtml += "<input id= '" + jsonResp[i].projectID + "' class='view' type='Submit' value='view project'></div> ";

                }

       
                $("#sProjectList").append(newHtml);

            },
            error: function(errorMsg){
                console.log(errorMsg.statusText);
            }
        });



    $('select').on('change', function (e) {
      location.reload();

    });



    $("#doSearch").on("click", function(){

      var $word = $("#searchbox");
      $("#sProjectList").empty();
  

      if ($word.val() != ""){
        var jsonToSend = {
                        "word" : $("#searchbox").val()
                    };

            $.ajax({
                        url : "projects/search.php",
                        type : "POST",
                        data : jsonToSend,
                        dataType : "json",
                        contentType : "application/x-www-form-urlencoded",
                        success: function(jsonResp){
                          var newHtml = "";
                        idPost = jsonResp.length;
                        for(i = 0; i < jsonResp.length; i++){

                           newHtml += "<div>" + "<img id='profilePicture' src='" + jsonResp[i].image + "''>";
                           newHtml += "<h4>" + jsonResp[i].projectName + "</h4>";
                           newHtml += "<p> Rating: "  + jsonResp[i].projectRating;
                           //for(i = 0; i < parseInt(jsonResp.projectRating); i++)
                            //newHtml += "*";
                           newHtml += "</p>";
                           newHtml += "<p> description: " + jsonResp[i].projectDescription + "</p>";
                           newHtml += "<p> created by: " + jsonResp[i].projectCreator + "</p> </div>" ;
                           newHtml += "<input id= '" + jsonResp[i].projectID + "' class='view' type='Submit' value='view project'></div> ";
                        }
                        $("#sProjectList").append(newHtml);
                        },
                        error : function(errorMessage){
                            var newHtml = "";
                            newHtml += "<div> NO RESULTS WERE FOUND </div> ";
                            $("#sProjectList").append(newHtml);
                        }

                    });


      }
      
    });

/* VIEW OTHER USER PROFILE

		$('#sProjectList').delegate(".view", "click", function(){


			var jsonToSend = {
		                    "projectID" : $(this).attr('id'),
		                };

		                $.ajax({
		                    url : "projects/profile.php", // tu php
		                    type : "POST",
		                    data : jsonToSend,
		                    dataType : "json",
		                    contentType : "application/x-www-form-urlencoded",
		                    success: function(jsonResponse){
		                    	window.location.replace("view.html");

		                    },
		                    error : function(errorMessage){
		                        alert(errorMessage.responseText);
		                    }

		                });


		});
    */


});
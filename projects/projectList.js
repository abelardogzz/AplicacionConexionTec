$(document).ready(function(){
    
      $.ajax({

                        url : "sessions/checksession.php",
                        contentType : "application/x-www-form-urlencoded",
                        success: function(jsonResponse){
                          var newHtml = "";
                          newHtml += "<a class='page' href='profile.html'> mi perfil</a>";
                          $('.page').replaceWith(newHtml);
                          newHtml = "";

                          $('#logout').removeAttr('hidden');
     
                        },
                        error : function(errorMessage){

                          var newHtml = "";
                          newHtml += "<a class='page' href='profile.html' hidden = 'true'> mi perfil</a>";
                          $('.page').replaceWith(newHtml);
                          newHtml = "";

                          newHtml += "<a class='button' href='user/sign_in.html'>iniciar session</a> </div>";
                           $('.button').replaceWith(newHtml);
                          
                        }

                    });


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
                  newHtml+= "<div class='element'><header name='image'";
                  newHtml += "style='.gallery div.element header.image_header;background: url("+jsonResp[i].image+");'"; 
                  newHtml += "class='image_header'><div class='gradient_curtain flCol-aiBas-jcBet'>";
                   //newHtml += "<div>" + "<img name='pPicture' src='" + jsonResp[i].image + "''>";
                   newHtml += "<a id= '" + jsonResp[i].projectID + "href='#'' class='details_link'>Ver Detalles</a>";
                   newHtml += "<div class='text_container'>";
                   newHtml += "<h5>" + jsonResp[i].projectName + "</h5>";
                   newHtml +="<p>Subtitle</p></div></div> </header><footer class='flRow-jcBet'><div class='text_container'>";
                   newHtml += "<h5> Project owner: " + jsonResp[i].creatorN + " " + jsonResp[i].creatorLN + "</h5>";
                   newHtml += "<p> Area: " + jsonResp[i].area + "</p>";
                   newHtml += "</div> </footer></div>";

        

                          }

                          $("#element").replaceWith(newHtml);
                        },
                        error : function(errorMessage){
                            var newHtml = "";
                            newHtml += "<div> NO RESULTS WERE FOUND </div> ";
                            $(".element").replaceWith(newHtml);
                        }

                    });
      
    });
    $(document).on('click', '.details_link', verProyecto);


});

function verProyecto(){
    var getId = $(this).attr('id');
    $(location).attr('href', 'projects/show.html?id='+ getId);
}

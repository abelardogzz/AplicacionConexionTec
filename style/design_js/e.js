$(document).ready(function() {
  var image_array = [
    "https://static.pexels.com/photos/221169/pexels-photo-221169.jpeg",
    "https://static.pexels.com/photos/226144/pexels-photo-226144.jpeg",
    "https://static.pexels.com/photos/227376/pexels-photo-227376.jpeg"
  ];

  var array_index = 0;
  $("#image_carousel").css("background-image", "url(" + image_array[array_index] + ")");
  var project;

  for (var i = 0; i < 10; i++) {
    project = new Project('Nombre', 'Image', 'Owner', 'Description');
  }

  $("#carousel_right").click(function(){
    if (array_index === image_array.length - 1) {
      array_index = 0;
    }
    else {
      array_index = array_index + 1;
    }
    $("#image_carousel").css("background-image", "url("+ image_array[array_index] +")");
  });

  $("#carousel_left").click(function(){
    if (array_index === 0) {
      array_index = image_array.length - 1;
    }
    else {
      array_index = array_index - 1;
    }
    $("#image_carousel").css("background-image", "url("+ image_array[array_index] +")");
  });

  $("a.material-icons").mouseenter(function(){
    $(this).text("star").prevAll().text("star");
  }).mouseleave(function(){
    $(this).text("star_border").prevAll().text("star_border");
  });


  $(".toggle").click(function(){
    $(this).toggleClass("positive");
    $(this).toggleClass("negative");

    if ($(this).text() == "Detener")
       $(this).text("Reanudar")
    else
       $(this).text("Detener");

  });



});

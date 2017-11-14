$(document).ready(function(){

	//Boton para crear una Muestra Virtual (Virtual Sample)
	$("#BtnCreaVS").on("click",function(){
		var jsonToSend ={
				"action" : "CREAVIRTUALSAMPLE",
                "fehcaInicio" : $("#fechaInicioCrea").val(),
                "fechaFin": $("#fechaFinCrea").val(),
                "nombre" : $("#NombreVS").val()
            };
        $.ajax({
                url : "../data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                    alert("Se creo correctamente");
                	//alert(jsonResponse.message);
                    console.log(jsonResponse);
                },
                error : function(errorMessage){
                	alert("ERROR Boton Crea VirtualSample");
                    alert(errorMessage.responseText);  
                    console.log(errorMessage);
                }
            });
	});


	//Boton para Modificar las fechas de calificacion
	$("#BtnDetenerCal").on("click",function(){
		var jsonToSend ={
				"action" : "DETIENECALIFICACIONES",
                "valor" : false
            };
        $.ajax({
                url : "../data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	//alert(jsonResponse.message);
                    alert("Detiene de Calificaciones con exito!");
                },
                error : function(errorMessage){
                	alert("ERROR Boton DEtiene Calificaciones");
                    alert(errorMessage.statusText);  
                    console.log(errorMessage);
                }
            });
	});

    //Boton para Modificar las fechas de calificacion
    $("#BtnReanudaCal").on("click",function(){
        var jsonToSend ={
                "action" : "REANUDACALIFICACIONES",
                "valor" : true
            };
        $.ajax({
                url : "../data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                    //alert(jsonResponse.message);
                    alert("Reanudacion de Calificaciones con exito!");
                },
                error : function(errorMessage){
                    alert("ERROR Boton reanuda Calificaciones");
                    alert(errorMessage.statusText);  
                    console.log(errorMessage);
                }
            });
    });




	//Boton para Modificar las fechas de calificacion
	$("#BtnDetenerReg").on("click",function(){
		var jsonToSend ={
				"action" : "DETIENEREGISTRO",
                "valor" : false
            };
        $.ajax({
                url : "../data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	//alert(jsonResponse.message);
                    alert("Detiene Registro con exito!");
                },
                error : function(errorMessage){
                	alert("ERROR Boton DEtiene REGISTRO");
                    alert(errorMessage.statusText);  
                    console.log(errorMessage);
                }
            });
	});
    //Boton para Modificar las fechas de calificacion
    $("#BtnReanudaReg").on("click",function(){
        var jsonToSend ={
                "action" : "REANUDAREGISTRO",
                "valor" : true
            };
        $.ajax({
                url : "../data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                    //alert(jsonResponse.message);
                    alert("Reanudacion de Registro con exito");
                },
                error : function(errorMessage){
                    alert("ERROR Boton renuda REGISTRO");
                    alert(errorMessage.statusText);  
                    console.log(errorMessage);
                }
            });
    });


});
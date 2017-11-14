$(document).ready(function(){
	
	//Boton para Modificar las fechas de calificacion
	$("#BtnGuardarCal").on("click",function(){
		var jsonToSend ={
				"action" : "GUARDARFECHACALIFICACION",
                "fehcaInicio" : $("#fechaInicioCal").val(),
                "fechaFin": $("#fechaFinCal").val()
            };
        $.ajax({
                url : "data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	alert(jsonResponse.message)
                },
                error : function(errorMessage){
                	alert("ERROR Boton Guardar Califificacion");
                    alert(errorMessage.statusText);  
                }
            });

	});


	//Boton para Modificar las fechas de registro
	$("#BtnGuardarReg").on("click",function(){
		var jsonToSend ={
				"action" : "GUARDARFECHAREGISTRO",
                "fehcaInicio" : $("#fechaInicioReg").val(),
                "fechaFin": $("#fechaFinReg").val()
            };
        $.ajax({
                url : "data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	alert(jsonResponse.message)
                },
                error : function(errorMessage){
                	alert("ERROR Boton Guardar Registro");
                    alert(errorMessage.statusText);  
                }
            });
	});


	//Boton para crear una Muestra Virtual (Virtual Sample)
	$("#BtnCreaVS").on("click",function(){
		var jsonToSend ={
				"action" : "CREAVIRTUALSAMPLE",
                "fehcaInicio" : $("#fechaInicioCrea").val(),
                "fechaFin": $("#fechaFinCrea").val(),
                "nombre" : $("#NombreVS").val()
            };
        $.ajax({
                url : "data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	alert(jsonResponse.message)
                },
                error : function(errorMessage){
                	alert("ERROR Boton Crea VirtualSample");
                    alert(errorMessage.statusText);  
                }
            });
	});


	//Boton para Modificar las fechas de calificacion
	$("#BtnDetenerCal").on("click",function(){
		var jsonToSend ={
				"action" : "DETIENECALIFICACIONES"
            };
        $.ajax({
                url : "data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	alert(jsonResponse.message)
                },
                error : function(errorMessage){
                	alert("ERROR Boton DEtiene Calificaciones");
                    alert(errorMessage.statusText);  
                }
            });
	});

	//Boton para Modificar las fechas de calificacion
	$("#BtnDetenerReg").on("click",function(){
		var jsonToSend ={
				"action" : "DETIENEREGISTRO"
            };
        $.ajax({
                url : "data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	alert(jsonResponse.message)
                },
                error : function(errorMessage){
                	alert("ERROR Boton DEtiene REGISTRO");
                    alert(errorMessage.statusText);  
                }
            });
	});


});
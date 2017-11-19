$(document).ready(function(){

    jsonToSend = { 
        "action": "LOADVIRTUALSAMPLES"
    }
    $.ajax({
        url : "../data/applicationLayer.php",
        type: "POST",
        data: jsonToSend, //Data to send to the service
        datatype : "json",
        contentType : "application/x-www-form-urlencoded", //Forces the content type to json

        success : function(jsonResponse){
            //alert("Se cargaron los VS bien");
            //alert(jsonResponse.message);
            console.log(jsonResponse);
            var newhtml = "";
            data = jsonResponse.virtualsample;
            console.log(data);
            for ( var x in data) {    
                //<tr><td>23/01/2016</td><td>12/10/2016</td><td>56</td><td><a class="button white clicked">Current</a></td></tr>
                //newhtml += "<label><input type=\"radio\" name=\"vs\" value=\"" + data[x].ID+ "\" ";
                newhtml+="<tr><td>"+ data[x].FechaInicio +"</td>";
                newhtml+=   "<td>"+data[x].FechaFin+"</td>";
                newhtml+=   "<td>56</td> ";
                newhtml+=   "<td><label><input type=\" radio \" name=\"vs\" value=\""+ data[x].ID+ " \" ";

               // newhtml += " > </label></br> </td> ";
                



                if (data[x].Current == 1){ 
                    //newhtml += " checked = \" checked \" >";
                    newhtml += " checked = \" checked \" > </label></br> </td> ";
                    console.log(data[x]);
                }
                else{
                    //newhtml += "  >"; 
                    newhtml += " > </label></br> </td> ";
                }
                newhtml+= "</tr>  ";
                //newhtml += data[x].FechaInicio+" "+ data[x].FechaFin +" </label></br>" ;
           }
           console.log(newhtml);
           $("#sVirtualSamples").append(newhtml);
        },
        error : function(errorMessage){
            alert("ERROR Carga VirtualSample");
            //alert(errorMessage.responseText);  
            console.log(errorMessage);
        }
    });


    //$("input[type='radio']").on("click",function(){
    $("#sVirtualSamples").change("click",function(){
        
        var radioValue = $("input[name='vs']:checked").val();
        if(radioValue){
            //alert("Your are a - " + radioValue);
        }

        jsonToSend = { 
            "action": "UPDATECURRENTVS",
            "id" : radioValue
        }

        $.ajax({
            url : "../data/applicationLayer.php",
            type: "POST",
            data: jsonToSend, //Data to send to the service
            datatype : "json",
            contentType : "application/x-www-form-urlencoded", //Forces the content type to json

            success : function(jsonResponse){
                console.log(jsonResponse);
                
            },
            error : function(errorMessage){
                alert("ERROR cambiar VirtualSample");
                alert(errorMessage.responseText);  
                console.log(errorMessage);
            }

        });

    });

	//Boton para crear una Muestra Virtual (Virtual Sample)
	$("#BtnCreaVS").on("click",function(){
        fInicio = new Date($("#fechaInicioCrea").val());
        fFin = new Date($("#fechaFinCrea").val());

        if (fInicio == "Invalid Date" || fFin == "Invalid Date" || (fFin-fInicio)<0  ){
            alert("La fecha no valida");
            //alert(fInicio);
        }
        else{
            var jsonToSend ={
                    "action" : "CREAVIRTUALSAMPLE",
                    "fehcaInicio" : $("#fechaInicioCrea").val(),
                    "fechaFin": $("#fechaFinCrea").val()
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
        }	
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

                    console.log(jsonResponse);
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
                    console.log(jsonResponse);
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
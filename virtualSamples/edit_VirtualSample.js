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
                //newhtml+=   "<td>56</td> ";
                newhtml+=   "<td><label><input type=\"radio\" name=\"vs\" value=\""+ data[x].ID+ " \" ";

               // newhtml += " > </label></br> </td> ";
                
                if (data[x].Current == 1){ 
                    //newhtml += " checked = \" checked \" >";
                    newhtml += " checked = \" checked \" > </label></td> ";
                    if (data[x].calif == 0){
                        $("#BtnDetenerCal").attr('class','toggle button negative');  
                        $("#BtnDetenerCal").text('Reanudar');    
                    }
                    else{
                        $("#BtnDetenerCal").attr('class','toggle button positive');    
                        $("#BtnDetenerCal").text('Detener');
                    }
                    if (data[x].reg == 0){
                        $("#BtnDetenerReg").attr('class','toggle button negative');    
                        $("#BtnDetenerReg").text('Reanudar');
                    }else{
                        $("#BtnDetenerReg").attr('class','toggle button positive');    
                        $("#BtnDetenerReg").text('Detener');
                    }

                    
                    console.log(data[x]);
                }
                else{
                    //newhtml += "  >"; 
                    newhtml += " > </label></td> ";
                }
                newhtml+= "</tr>  ";
                //newhtml += data[x].FechaInicio+" "+ data[x].FechaFin +" </label></br>" ;
           }
           //console.log(newhtml);
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
                $("#BtnDetenerCal").attr('class','toggle button negative');
                $("#BtnDetenerCal").text('Reanudar');
                $("#BtnDetenerReg").attr('class','toggle button negative');
                $("#BtnDetenerReg").text('Reanudar');
                
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
                    newhtml = "<tr><td>" + $("#fechaInicioCrea").val() ;
                    newhtml+= "</td><td> "+$("#fechaFinCrea").val();
                    newhtml +="</td>";
                    newhtml +="<td><label><input type=\"radio\" name=\"vs\" checked = \"checked\"> </label></td> </tr> ";
                    $("#BtnDetenerCal").attr('class','toggle button positive');
                    $("#BtnDetenerCal").text('Detener');
                    $("#BtnDetenerReg").attr('class','toggle button positive');
                    $("#BtnDetenerReg").text('Detener');
                      
                    $("#sVirtualSamples").append(newhtml);

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
        $valor  =  $("#BtnDetenerCal").attr('class');
        
        console.log($("#BtnDetenerCal").attr('class'));

        if ($("#BtnDetenerCal").attr('class') == 'toggle button positive'){
            //alert($valor);
            $valor = false;
            $("#BtnDetenerCal").attr('class','toggle button negative');
            $("#BtnDetenerCal").text('Reanudar');
        }else{
            //alert($valor);
            $valor = true;
            $("#BtnDetenerCal").attr('class','toggle button positive');
            $("#BtnDetenerCal").text('Detener');
        }


		var jsonToSend ={
				"action" : "DETIENECALIFICACIONES",
                "valor" : $valor
            };
        $.ajax({
                url : "../data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	//alert(jsonResponse.message);
                    if ( $valor)
                        alert("Renuda de Calificaciones con exito!");
                    else
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
	$("#BtnDetenerReg").on("click",function(){
        $valor  =  $("#BtnDetenerReg").attr('class');
        
        console.log($("#BtnDetenerReg").attr('class'));

        if ($("#BtnDetenerReg").attr('class') == 'toggle button positive'){
            //alert($valor);
            $valor = false;
            $("#BtnDetenerReg").attr('class','toggle button negative');
            $("#BtnDetenerReg").text('Reanudar');
        }else{
            //alert($valor);
            $valor = true;
            $("#BtnDetenerReg").attr('class','toggle button positive');
            $("#BtnDetenerReg").text('Detener');
        }


		var jsonToSend ={
				"action" : "DETIENEREGISTRO",
                "valor" : $valor
            };
        $.ajax({
                url : "../data/applicationLayer.php",
                type: "POST",
                data: jsonToSend, //Data to send to the service
                datatype : "json",
                contentType : "application/x-www-form-urlencoded", //Forces the content type to json

                success : function(jsonResponse){
                	//alert(jsonResponse.message);
                    if ( $valor)
                        alert("Renuda de Registro con exito!");
                    else
                        alert("Detiene de Registro con exito!");
                },
                error : function(errorMessage){
                	alert("ERROR Boton DEtiene REGISTRO");
                    alert(errorMessage.statusText);  
                    console.log(errorMessage);
                }
            });
	});


});
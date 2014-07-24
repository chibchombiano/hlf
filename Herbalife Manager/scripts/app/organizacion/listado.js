
var app = app || {};

app.organizacions = (function () {
    'use strict'
    
    // organizacions view model
    var organizacionsViewModel = (function () {

        // Navigate to organizacionView When some organizacion is selected
        var organizacionSelected = function (e) {
            app.mobileApp.navigate('views/organizacion/person.html?uid=' + e.data.uid+ '&id=' + e.data.id);
        };

        // Navigate to app home
        var navigateHome = function () {
            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        var logout = function () {

            app.helper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };
        
        var enviarSms = function(){
            
            var listadoMensajes = app.personasDatasource.personas._data;
            //var arrayEnvioMensajes = new Array();
            
            for(var i in listadoMensajes){
                try{
                    if(listadoMensajes[i].EnviarSms === true && listadoMensajes[i].Telefono_Movil !== ""){
                        //arrayEnvioMensajes.push({"Numero": listadoMensajes[i].Telefono_Movil});
                        //enviarSms( listadoMensajes[i].Telefono_Movil.toString(),'Mensaje de prueba');
                        enviarSmsRequest('+573176578785','Mensaje de prueba');
                    }
                }
                catch(ex){}
            }           
            
        };
        
        function enviarSmsRequest(numero, mensaje){
            var data = [{                          
                          "to": "+573176578785",
                          "from": "+15706648744",
                          "body": "Test"                         
                    }]
            
            // No se puede xq el jsonp no deja mandar custom header
            
            /*
            $.ajax({ 
                url: "http://api.twilio.com/2010-04-01/Accounts/ACf92d336dcb45ffad062c0becacdd7359/Messages",            
                type: 'POST',                
                beforeSend :setHeader,
                data: data
            });
            */
            
            var formData = new FormData();
            formData.append("To", "+573176578785");
            formData.append("From", "+15706648744");
            formData.append("Body", "hola douglas");            
            
            //var params = JSON.stringify({ from: "+573176578785", to: "+15706648744", body : "test" });
            
            var request = app.xtmlRequest("POST", "https://api.twilio.com/2010-04-01/Accounts/ACf92d336dcb45ffad062c0becacdd7359/Messages");
            if (request){
                request.onload = function(){
                    alert(request.response);
                };
                request.send(formData);
            }
            
        }
        
        function createCORSRequest(method, url){
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr){
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined"){
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                xhr = null;
            }
            try{
            	xhr.setRequestHeader('Authorization', 'Basic QUNmOTJkMzM2ZGNiNDVmZmFkMDYyYzBiZWNhY2RkNzM1OToyYTVkMGNkN2JiNzlmOWE2NDY1NTg4YjU0MTkzYmZlMw=='); 	
                //xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
				//xhr.setRequestHeader("Content-length", params.length);
            }
            catch(ex){}
            return xhr;
        }





        return {
            organizacions: app.personasDatasource.personas,
            organizacionSelected: organizacionSelected,
            logout: logout,
            enviarSms : enviarSms
        };

    }());

    return organizacionsViewModel;

}());

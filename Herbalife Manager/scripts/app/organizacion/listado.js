
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
            
            var mensaje = $('#multipleTextoSms').val();
            var listadoMensajes = app.personasDatasource.personas._data;
            
            for(var i in listadoMensajes){
                try{
                    if(listadoMensajes[i].EnviarSms === true && listadoMensajes[i].Telefono_Movil !== ""){                        
                        
                        enviarSmsRequest("+57" + listadoMensajes[i].Telefono_Movil.toString(), mensaje);
                    }
                }
                catch(ex){}
            }           
            
        };
        
        function enviarSmsRequest(numero, mensaje){
           
            
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
            formData.append("To", numero);
            formData.append("From", "+15706648744");
            formData.append("Body", mensaje);            
            
            var request = app.xtmlRequest("POST", "https://api.twilio.com/2010-04-01/Accounts/ACf92d336dcb45ffad062c0becacdd7359/Messages");
            if (request){
                request.onload = function(){
                    //alert(request.response);
					app.mobileApp.navigate('#:back');                    
                };
                request.send(formData);
            }
            
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

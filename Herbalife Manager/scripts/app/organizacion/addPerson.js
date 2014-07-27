/**
 * AddPerson view model
 */

var app = app || {};

app.AddPerson = (function () {
    'use strict'

    var addPersonViewModel = (function () {
        var $nombres;
        var $apellidos;
        var $telefono;
        var $telefonoMovil;
        var $email;
        var $peso;
        var $personFechaNacimiento;
        var $addPersonFechaNacimientoControl;
        var validator;       
        
        var init = function () {            
            validator = $('#enterStatus').kendoValidator().data('kendoValidator');            
            $nombres = $('#personNombres');
            $apellidos = $('#personApellidos');
            $telefono = $('#personTelefono');
            $telefonoMovil = $('#personTelefonoMovil');
            $email = $('#personEmail');
            $peso = $('#personPeso');
            $personFechaNacimiento = $('#personFechaNacimiento');
            $addPersonFechaNacimientoControl = $('#addPersonFechaNacimientoControl');
            app.hideNotSupportedElements();
        };
        
        var show = function () {            
            // Clear field on view show            
            validator.hideMessages();
            
            if(app.commonCalendar !== undefined && app.commonCalendar.fechaSelecionada() !== undefined){
                try{
                    $('#personFechaNacimientoText').val(app.commonCalendar.fechaSelecionada());
                }
                catch(ex){}
            }
            
        };
        
        var savePerson = function () {
            
            // Validating of the required fields
            if (validator.validate()) {
                
                // Adding new Person to Activities model
                var personas = app.organizacions.organizacions;
                var Person = personas.add();
                
                Person.Nombres = $nombres.val();
                Person.Apellidos = $apellidos.val();
                Person.Telefono = $telefono.val();
                Person.Telefono_Movil = $telefonoMovil.val();
                Person.UserId = app.Users.currentUser.get('data').Id;
                Person.Email = $email.val();
                Person.Peso = $peso.val();
                 
                if(devicePlatform === "iOS" || devicePlatform === "android"){
                	Person.Fecha_Nacimiento = $personFechaNacimiento.val();
                 }
                else{
                    Person.Fecha_Nacimiento = $('#personFechaNacimientoText').val();
                }
                
                personas.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });
                
                personas.sync();
            }
        };
        
        var seleccionarFecha = function(){
            app.mobileApp.navigate('views/common/calendar.html');
        }
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            savePerson: savePerson,
            seleccionarFecha : seleccionarFecha
        };
        
    }());
    
    return addPersonViewModel;
    
}());

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
        var validator;
        
        var init = function () {            
            validator = $('#enterStatus').kendoValidator().data('kendoValidator');            
            $nombres = $('#personNombres');
            $apellidos = $('#personApellidos');
            $telefono = $('#personTelefono');
            $telefonoMovil = $('#personTelefonoMovil');
            $email = $('#personEmail');
            $peso = $('#personPeso');
        };
        
        var show = function () {            
            // Clear field on view show            
            validator.hideMessages();
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
                
                personas.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });
                
                personas.sync();
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            savePerson: savePerson
        };
        
    }());
    
    return addPersonViewModel;
    
}());

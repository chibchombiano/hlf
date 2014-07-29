/**
 * AddPerson view model
 */

var app = app || {};

app.AddTrecientos = (function () {
    'use strict'

    var ViewModel = (function () {
        var validator;       
        
        var init = function () {            
            validator = $('#trecientos-form').kendoValidator().data('kendoValidator');
        };
        
        var show = function () {            
            // Clear field on view show            
            validator.hideMessages();
        };
        
        var save = function () {
            
            // Validating of the required fields
            if (validator.validate()) {
                
                var trecientos = app.trecientosDatasource.trecientos;
                var item = trecientos.add();
                
                item.Nombres = $('#trecientos_add_Nombres').val();
                item.Telefono = $('#trecientos_add_Telefono').val();
                item.idPerson = appSettings.person.id;
                item.Parentesco = $('#trecientos_add_Parentesco').val();
                item.Email = $('#trecientos_add_Email').val();
                item.Comentarios = $('#trecientos_add_Comentarios').val();
                 
                trecientos.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });
                
                trecientos.sync();
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            save: save
        };
        
    }());
    
    return ViewModel;
    
}());

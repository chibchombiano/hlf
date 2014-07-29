
var app = app || {};

app.trecientos = (function () {
    'use strict'
    
    // organizacions view model
    var trecientosViewModel = (function () {
        
        var show = function () {
            app.trecientosDatasource.trecientos.filter( { field: "idPerson", operator: "eq", value: appSettings.person.id });
          	app.trecientosDatasource.trecientos.read();
        };
        
        var hide = function(){
            
        }

        // Navigate to organizacionView When some organizacion is selected
        var selected = function (e) {
            app.mobileApp.navigate('views/trecientos/view.html?uid=' + e.data.uid+ '&id=' + e.data.id);
        };

        // Navigate to app home
        var navigateHome = function () {
            app.mobileApp.navigate('#welcome');
        };
        
        
        return {
            hide : hide,
            show : show,
            trecientos: app.trecientosDatasource.trecientos,
            selected: selected
        };

    }());

    return trecientosViewModel;

}());

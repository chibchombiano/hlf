
var app = app || {};

app.trecientos = (function () {
    'use strict'
    
    // organizacions view model
    var trecientosViewModel = (function () {

        // Navigate to organizacionView When some organizacion is selected
        var trecientosSelected = function (e) {
            app.mobileApp.navigate('views/organizacion/person.html?uid=' + e.data.uid+ '&id=' + e.data.id);
        };

        // Navigate to app home
        var navigateHome = function () {
            app.mobileApp.navigate('#welcome');
        };
        
        
        return {
            trecientos: app.trecientosDatasource.trecientos,
            trecientosSelected: trecientosSelected
        };

    }());

    return trecientosViewModel;

}());

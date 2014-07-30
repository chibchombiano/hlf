
var app = app || {};

app.productos = (function () {
    'use strict'
    
    // organizacions view model
    var ViewModel = (function () {
        
        var init = function () {
          	app.productosDatasource.productos.read();
        };
        
        var show = function () {
          	
        };
        
        var hide = function(){
            
        }

        // Navigate to organizacionView When some organizacion is selected
        var selected = function (e) {
            app.mobileApp.navigate('views/productos/view.html?uid=' + e.data.uid+ '&id=' + e.data.id);
        };

        // Navigate to app home
        var navigateHome = function () {
            app.mobileApp.navigate('#welcome');
        };
        
        
        return {
            hide : hide,
            show : show,
            init: init,
            productos: app.productosDatasource.productos,
            selected: selected
        };

    }());

    return ViewModel;

}());

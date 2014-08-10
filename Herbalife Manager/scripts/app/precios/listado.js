
var app = app || {};

app.price = (function () {
    'use strict'
    
    // organizacions view model
    var ViewModel = (function () {
        
        
      var Model = {
            id: 'sku',
            fields: {
                sku: {
                    field: 'sku',
                    defaultValue: ''
                },
                nombre: {
                    field: 'nombre',
                    defaultValue: ''
                },
                precioVenta: {
                    field: 'precioVenta',
                    defaultValue: ''
                },
                puntosVolumen: {
                    field: 'puntosVolumen',
                    defaultValue: ''
                },
                baseGanancia: {
                    field: 'baseGanancia',
                    defaultValue: ''
                }
            }
        };
        
        var init = function(){  
            app.mobileApp.showLoading();
            obtenerPrecios();
        };
        
        var show = function () {
          	
        };
        
        var hide = function(){
            
        }        
        
        function obtenerPrecios(){
            app.ajaxCall('https://bs2.cdn.telerik.com/v1/8UzCMGzRqAhcnuBx/a631b2f0-208d-11e4-b48a-71ea831c5a5a','GET',[],'').then( function(data){
                 	   var result = procesarValores(data);      
                       var localDataSource = new kendo.data.DataSource({ data: result, schema: { model: Model } });
                       localDataSource.read();
                
                        $("#price-listview").kendoMobileListView({
                            dataSource: localDataSource,
                            template: $("#priceTemplate").html()                            
                        });
                
                		app.mobileApp.hideLoading();
                
                   });
        }
        
        function procesarValores(data){
            var div = document.createElement('div');
        	div.innerHTML = data;
            
            var listado = new Array();
            var tabla = $(div).find('.pricelist-data');
            
            for(var i in tabla){
                try{
                    
                   if(!isNaN(i)){
                    
                    if((i).toString() === "18"){
                        var test;
                    }
                        
                    var that = tabla[i];
                    var sku = $(that).find('.col-SKU').find('span').text().toString().trim();
                    var nombre = $(that).find('.col-Product').text().toString().trim();
                    var precioVenta = $(that).find('.col-RetailPrice').text().toString().trim();
                    var puntosVolumen = $(that).find('.col-VolumePoint').text().toString().trim();
                    var baseGanancia = $(that).find('.col-EarnBase').text().toString().trim();
                
                    listado.push({
                        'sku': sku, 
                        'nombre' : nombre, 
                        'precioVenta' : precioVenta, 
                        'puntosVolumen' : puntosVolumen,
                        'baseGanancia' : baseGanancia
                    });
                }
                }
                catch(ex){
                console.log(ex);
                }
            
            }
            
            return listado;
        }
        
        
        return {
            hide : hide,
            show : show,
            init: init            
        };

    }());

    return ViewModel;

}());

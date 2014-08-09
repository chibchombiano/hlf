
var app = app || {};

app.volumen = (function () {
    'use strict'
    
    // organizacions view model
    var ViewModel = (function () {
        
        
      var Model = {
            id: 'Mes',
            fields: {
                mes: {
                    field: 'Mes',
                    defaultValue: ''
                },
                volumen_Comp_Per: {
                    field: 'Volumen_Comp_Pers',
                    defaultValue: ''
                },
                volumen_personal: {
                    field: 'Volumen_Personal',
                    defaultValue: ''
                },
                volumen_grupal: {
                    field: 'Volumen_Grupal',
                    defaultValue: ''
                },
                suma_personal_grupal: {
                    field: 'Volumen_Personal_Mas_Grupal',
                    defaultValue: ''
                },
                organizacion: {
                    field: 'Volumen_Organizacion',
                    defaultValue: ''
                },
                regalias: {
                    field: 'Puntos_Regalias',
                    defaultValue: ''
                }
            }
        };
        
        var init = function(){
            obtenerVolumen();
            obtenerValoresVolumen();
        };
        
        var show = function () {
          	
        };
        
        var hide = function(){
            
        }

        var obtenerVolumen = function(){
            var formData = new FormData();
            formData.append("userName", "L1171256");
            formData.append("password", "5069");            
            
             // var request = app.xtmlRequestHlf("POST", "https://co.myherbalife.com/Authentication/Logon");
             var request = app.xtmlRequestHlf("GET", "https://bs2.cdn.telerik.com/v1/8UzCMGzRqAhcnuBx/cdd661a0-1fb8-11e4-aa74-9bbce71dcd5c");
            
             if (request){
                request.onload = function(){
                   //getValues();
                   
                };
                request.onerror = function()
                {
                    alert(request.response);
                }
                
                //request.send(formData);
                request.send();
            }
        }
        
        function obtenerValoresVolumen(){
            app.ajaxCall('https://bs1.cdn.telerik.com/v1/8UzCMGzRqAhcnuBx/233c9060-1fb9-11e4-aa74-9bbce71dcd5c','GET',[],'').then( function(data){
                       var result = app.obtenerDatosHtml(data);
                       var localDataSource = new kendo.data.DataSource({ data: result, schema: { model: Model } });
                       localDataSource.read();
                       
                        $("#volumen-listview").kendoMobileListView({
                            dataSource: localDataSource,
                            template: $("#volumenTemplate").html()                            
                        });
                
                   });
        }
        
        function getValues(){
			var request = app.xtmlRequestHlf("GET", "https://co.myherbalife.com/api/Volume/");
            if (request){
                request.onload = function(){
                   alert(request.response);					
                    $('#consoleResponse').val(request.response);
                };
                request.onerror = function()
                {
                    alert(request.response);
                }
                request.send();
            }
        }
        
        
        return {
            hide : hide,
            show : show,
            init: init            
        };

    }());

    return ViewModel;

}());

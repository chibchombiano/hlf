
var app = app || {};

app.viewTrecientos = (function () {
    'use strict'
    	
    
    var ViewModel = (function () {
        
        var Item;
        var Id;
        var Uid;
        
        var init = function () {
            
    
        };
        
        var show = function (e) {
       
            Uid = e.view.params.uid;
            Id = e.view.params.id;
            
            Item = app.trecientosDatasource.trecientos.getByUid(Uid);
            kendo.bind(e.view.element, Item, kendo.mobile.ui);       
        };
        
        var remove = function () {
            
            var elementos = app.trecientosDatasource.trecientos;
            var item = elementos.getByUid(Uid);
            
            app.showConfirm(
                appSettings.messages.removeActivityConfirm,
                'Eliminar contacto',
                function (confirmed) {
                    if (confirmed === true || confirmed === 1) {
                        elementos.remove(item);
                        elementos.one('sync', function () {
                            app.mobileApp.navigate('#:back');
                        });
                        elementos.sync();
                    }
                }
            );
        };
        
        var update = function () {
            
            var elementos = app.trecientosDatasource.trecientos;
            
            elementos.one('sync', function () {
                app.mobileApp.navigate('#:back');
            });
            elementos.sync();            
            
        };
        
        
        
        return {
            init: init,
            show: show,
            remove: remove,
            update : update,            
            item: function () {
                return Item;
            },
        };
        
    }());
    
    return ViewModel;
    
}());

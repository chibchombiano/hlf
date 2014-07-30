
var app = app || {};

app.viewProductos = (function () {
    'use strict'
    	
    
    var ViewModel = (function () {
        
        var Item;
        var Id;
        var Uid;
        
        var init = function (e) {            
            
        };
        
        var show = function (e) {
        	
            Uid = e.view.params.uid;
            Id = e.view.params.id;
            
            Item = app.productosDatasource.productos.getByUid(Uid);
            kendo.bind(e.view.element, Item, kendo.mobile.ui);           
            
            var $divProductos = $('#productos-sabores');
            
            if(Item.Sabores !== null){
                $divProductos.show();
                $("#productos-listview-Sabores").kendoMobileListView({
                    dataSource: Item.Sabores,
                    template: "#= data #"
                  });
            }
            else{
                $divProductos.hide();
                $("#productos-listview-Sabores").kendoMobileListView({
                    dataSource: []
                  });
            }
            
        };
        
              
        return {
            init: init,
            show: show,      
            item: function () {
                return Item;
            },
        };
        
    }());
    
    return ViewModel;
    
}());

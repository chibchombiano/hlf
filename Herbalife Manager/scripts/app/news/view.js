
var app = app || {};

app.viewNews = (function () {
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
            
            Item = app.newsDatasource.news.getByUid(Uid);
            kendo.bind(e.view.element, Item, kendo.mobile.ui);       
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

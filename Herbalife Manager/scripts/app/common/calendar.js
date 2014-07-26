/**
 * AddActivity view model
 */

var app = app || {};

app.commonCalendar = (function () {
    'use strict'

    var commonCalendarViewModel = (function () {
        
        var init = function () {            
            $("#commonCalendar").kendoCalendar();
        };
        
        var show = function () {
        	
        };
        
        return {
            init: init,
            show: show          
        };
        
    }());
    
    return commonCalendarViewModel;
    
}());

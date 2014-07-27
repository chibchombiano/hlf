/**
 * AddActivity view model
 */

var app = app || {};

app.commonCalendar = (function () {
    'use strict'

    var commonCalendarViewModel = (function () {
        
        var selectedDate;
        
        var fechaSelecionada = function getFechaSeleccionada(){
            return selectedDate;
        }
        
        var init = function () {            
            $("#commonCalendar").kendoCalendar({
                change: onChange
            });
        };
        
        var show = function () {
        	
        };
        
        var onChange = function(e){
            selectedDate = kendo.toString(this.value(), 'd');  
            app.mobileApp.navigate('#:back');
        }
        
        
        
        return {
            init: init,
            show: show,
            fechaSelecionada : fechaSelecionada
        };
        
    }());
    
    return commonCalendarViewModel;
    
}());

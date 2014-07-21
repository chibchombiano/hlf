
var app = app || {};

app.Person = (function () {
    'use strict'
    
    var $commentsContainer,
        listScroller;
    
    var PersonViewModel = (function () {
        
        var PersonUid,
            Person,
            $PersonPicture;
        
        var init = function () {
            $commentsContainer = $('#comments-listview');
            $PersonPicture = $('#picture');
        };
        
        var show = function (e) {
            
            listScroller = e.view.scroller;
            listScroller.reset();
            
            PersonUid = e.view.params.uid;
            // Get current Person (based on item uid) from Activities model
            Person = app.organizacions.organizacions.getByUid(PersonUid);
            Person['Nombre_Mostrar'] = Person.Nombres + ' ' + Person.Apellidos;
            
            $PersonPicture[0].style.display = Person.Picture ? 'block' : 'none';
            
            kendo.bind(e.view.element, Person, kendo.mobile.ui);
        };
        
        var removePerson = function () {
            
            var personas = app.organizacions.organizacions;
            var Person = personas.getByUid(PersonUid);
            
            app.showConfirm(
                appSettings.messages.removeActivityConfirm,
                'Eliminar contacto',
                function (confirmed) {
                    if (confirmed === true || confirmed === 1) {
                        
                        personas.remove(Person);
                        personas.one('sync', function () {
                            app.mobileApp.navigate('#:back');
                        });
                        personas.sync();
                    }
                }
            );
        };
        
        var updatePerson = function () {
            
            var personas = app.organizacions.organizacions;
            
            personas.one('sync', function () {
                app.mobileApp.navigate('#:back');
            });
            personas.sync();            
            
        };
        
        var editPerson = function(){
            app.mobileApp.navigate('views/organizacion/editPerson.html?uid=' + PersonUid);
        }
        
        return {
            init: init,
            show: show,
            remove: removePerson,
            update : updatePerson,
            edit	 : editPerson,
            activity: function () {
                return Person;
            },
        };
        
    }());
    
    return PersonViewModel;
    
}());

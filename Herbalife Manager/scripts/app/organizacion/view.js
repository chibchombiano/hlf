
var app = app || {};

app.Person = (function () {
    'use strict'
    
    var $commentsContainer,
        listScroller;
    	
    
    var PersonViewModel = (function () {
        
        var PersonUid,
            PersonId,
            Person,
            dataUpload,
            imageData,
            devicePlatform,
            $PersonPicture;
        
        
        var init = function () {
            $commentsContainer = $('#comments-listview');
            $PersonPicture = $('#picturePerson');
            devicePlatform = device.platform;
            
            app.hideNotSupportedElements();
        };
        
        var show = function (e) {
            
            listScroller = e.view.scroller;
            listScroller.reset();
            
            PersonUid = e.view.params.uid;
            PersonId = e.view.params.id;
            // Get current Person (based on item uid) from Activities model
            Person = app.organizacions.organizacions.getByUid(PersonUid);
            Person['Nombre_Mostrar'] = Person.Nombres + ' ' + Person.Apellidos;
            
            $PersonPicture[0].style.display = Person.Picture ? 'block' : 'none';
            
            kendo.bind(e.view.element, Person, kendo.mobile.ui);            
            appSettings.person.id = PersonId;
            
            /* Codigo para enviar push
            appConsole.log('test');
            app.PushRegistrarTest.enablePushNotifications();
            */
            
            if(app.commonCalendar !== undefined && app.commonCalendar.fechaSelecionada() !== undefined){
                try{
                    
                    $('#editPersonFechaNacimientoText').val(app.commonCalendar.fechaSelecionada());
                    Person.Fecha_Nacimiento = new Date(app.commonCalendar.fechaSelecionada());
                }
                catch(ex){}
            }
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
        
        var foto = function(){
            	navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    			destinationType: Camera.DestinationType.DATA_URL
             });        
        }   

        function onSuccess(imageDataResult) {
            imageData = imageDataResult;
            var el = app.everlive;
            
            var query = new Everlive.Query();
            		query.where().eq('Filename', PersonId + ".png");
                    el.Files.destroy(query,imageDeleted,
                        function(error){
                            alert(JSON.stringify(error));
              });                
                
        }
        
        function imageDeleted(data){
        	var el = app.everlive;
            
        	var file = {
                "Filename": PersonId + ".png",
                "ContentType": "image/png",
                "base64": imageData
            };
            
            el.Files.create(file,
            function (data) {
               uploadPhoto(data);
            },
            function (error) {
                alert(JSON.stringify(error));
            });
        }
        
        function onFail(message) {
            alert('Failed because: ' + message);
        }
        
        function uploadPhoto(data){
            var result = data.result;
            var urlImagen = result.Uri;
            var idImagen = result.Id;
            
            var personas = app.organizacions.organizacions;
            personas.updateField({ keyField: "uid", keyValue: PersonUid, updateField: 'Picture', updateValue: idImagen });
            personas.updateField({ keyField: "uid", keyValue: PersonUid, updateField: 'Picture_Url', updateValue: urlImagen});
            updatePerson();
        }
        
        var editPerson = function(){
            app.mobileApp.navigate('views/organizacion/editPerson.html?uid=' + PersonUid);
        }
        
        return {
            init: init,
            show: show,
            remove: removePerson,
            update : updatePerson,
            edit   : editPerson,         
            foto: foto,
            activity: function () {
                return Person;
            },
        };
        
    }());
    
    return PersonViewModel;
    
}());

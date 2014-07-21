
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
            $PersonPicture = $('#picturePerson');
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
        
        var foto = function(){
            	navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
    			destinationType: Camera.DestinationType.FILE_URI }); 
        }   

        function onSuccess(imageURI) {
            
        	//var image = document.getElementById('myImage');
    		//image.src = imageURI;
        
            //var fotos = app.fotosDatasource.fotos;
            //var foto = fotos.add();
            
            /*
            foto.Foto = "data:image/jpeg;base64," + imageData;
            
            fotos.one('sync', function (e) {
            	Person.idFoto = foto.id;
                updatePerson();
            });
            
            fotos.sync();
            
            $PersonPicture.attr("src", "data:image/jpeg;base64," + imageData);
            */
            
            var el = app.everlive;
            var imageURI = imageURI;
            // the retrieved URI of the file, e.g. using navigator.camera.getPicture()
            var uploadUrl = el.Files.getUploadUrl();
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = Person.Id.toString();
            options.mimeType="image/png";
            options.headers = el.buildAuthHeader();
            var ft = new FileTransfer();
            ft.upload(imageURI, uploadUrl,  function (r) {
                alert('success') },  function(error){
                alert("An error has occurred: Code = " + error.code);
            }, options);
        }
    
        
        
        function onFail(message) {
            alert('Failed because: ' + message);
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

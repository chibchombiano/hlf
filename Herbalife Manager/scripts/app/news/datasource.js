var app = app || {};

app.newsDatasource = (function () {
    
    	var dataShowArray = new Array();

        var Model = {

            id: 'Id',
            fields: {
                content: {
                    field: 'content',
                    defaultValue: ''
                },
                published: {
                    field: 'published',
                    defaultValue: new Date()
                },
                title: {
                    field: 'title',
                    defaultValue: ''
                },
                imagen: {
                    field: 'imagen',
                    defaultValue: ''
                }
            },
             CreatedAtFormatted: function () {
                return app.helper.formatDate(this.get('published'));
            }
        };

        // organizacions data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var DataSource = new kendo.data.DataSource({            
            schema: {
                model: Model
            },
            transport: {
                read: function (options) { dataSourceRead(options); },              
            }            
        });

    	function dataSourceRead(options) {
            read(options).then(
                function (result) {                            
                    options.success(result);
                },
                function (error) {
                    options.error(error);
                }
            );
        };
    
    function  read(options) {
        var deferred = Q.defer();            
        
         var request = app.xtmlRequestNotHeadeers("GET", "https://www.facebook.com/feeds/page.php?format=json&id=226425227388491");
            if (request){
                request.onload = function(){
                    var data = JSON.parse(request.response).entries;                   
                    
                    for(var x in data){
                        
                        if(data[x].title.trim().length > 0){
                    		var images =  app.getImagesFromHtlm(data[x].content);
                        
                            if(images !== null && images.length > 0){
                                dataShowArray.push({imagen : app.getImagesFromHtlm(data[x].content), content : data[x].content, title : data[x].title, published : data[x].published });
                            }
                            else{
                                dataShowArray.push({imagen : 'styles/images/avatar.png', content : data[x].content, title : data[x].title, published : data[x].published });
                            }
                        }
                    }
                    
					deferred.resolve(dataShowArray);
                };
                request.send();
            }
            
            // On error
            // deferred.reject(error);
            
            return deferred.promise;
        }
    
    
        return {
            news: DataSource
        };

    }());

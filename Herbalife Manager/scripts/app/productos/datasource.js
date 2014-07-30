var app = app || {};

app.productosDatasource = (function () {

        var Model = {
            id: 'Id',
            fields: {               
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Nombre: {
                    fields: 'Nombre',
                    defaultValue: null
                },
                Descripcion: {
                    field: 'Descripcion',
                    defaultValue: null
                },
                Beneficios: [],
                Sabores: [],
                Tipo: {
                    field: 'Tipo',
                    defaultValue: null
                },
                idFoto: {
                    field: 'idFoto',
                    defaultValue: null
                },                
            },
            CreatedAtFormatted: function () {
                return app.helper.formatDate(this.get('CreatedAt'));
            },
            PictureUrl: function () {
                return app.helper.resolvePictureUrl(this.get('idFoto'));
            }
        };

        // organizacions data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var DataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: Model
            },
            transport: {
                // Required by Backend Services
                typeName: 'Productos'
            },
            change: function (e) {
            },
            requestStart: function(e) {
              if ( !app.isOnline() ) {                    
                    e.preventDefault();
                    return false;
                }
            },
            requestEnd: function(e) {
              
            },
            sort: { field: 'Nombre' },            
            serverFiltering: true
        });

        return {
            productos: DataSource
        };

    }());

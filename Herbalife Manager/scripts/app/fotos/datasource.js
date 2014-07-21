var app = app || {};

app.fotosDatasource = (function () {

        var fotosModel = {

            id: 'Id',
            fields: {                
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Foto: {
                    field: 'foto',
                    defaultValue: null
                }
            },
            CreatedAtFormatted: function () {
                return app.helper.formatDate(this.get('CreatedAt'));
            }
        };

        // organizacions data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var fotoDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: fotosModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Fotos'
            },
            change: function (e) {
            },
            requestStart: function(e) {
              if ( !app.isOnline() ) {                    
                    e.preventDefault();
                    return false;
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        return {
            fotos: fotoDataSource
        };

    }());

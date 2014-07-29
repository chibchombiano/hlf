var app = app || {};

app.trecientosDatasource = (function () {

        var trecientosModel = {

            id: 'Id',
            fields: {
                Text: {
                    field: 'Text',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Comentarios: {
                    fields: 'Comentarios',
                    defaultValue: null
                },
                Email: {
                    field: 'Email',
                    defaultValue: null
                },
                Nombres: {
                    field: 'Nombres',
                    defaultValue: null
                },
                Parentesco: {
                    field: 'Parentesco',
                    defaultValue: null
                },
                Telefono: {
                    field: 'Telefono',
                    defaultValue: null
                },
                idPerson : {
                    field: 'idPerson',
                    defaultValue: null
                }
            },
            CreatedAtFormatted: function () {
                return app.helper.formatDate(this.get('CreatedAt'));
            },
        };

        // organizacions data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var trecientosDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: trecientosModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Trecientos'
            },
            change: function (e) {
            },
            requestStart: function(e) {
              if ( !app.isOnline() ) {                    
                    e.preventDefault();
                    return false;
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' },            
            serverFiltering: true
        });

        return {
            trecientos: trecientosDataSource
        };

    }());

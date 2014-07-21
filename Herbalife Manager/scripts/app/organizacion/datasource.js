var app = app || {};

app.personasDatasource = (function () {

        var personasModel = {

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
                Picture: {
                    fields: 'Picture',
                    defaultValue: null
                },
                UserId: {
                    field: 'UserId',
                    defaultValue: null
                },
                Nombres: {
                    field: 'Nombres',
                    defaultValue: null
                },
                Apellidos: {
                    field: 'Apellidos',
                    defaultValue: null
                },
                Telefono: {
                    field: 'Telefono',
                    defaultValue: null
                },
                Telefono_Movil: {
                    field: 'Telefono_Movil',
                    defaultValue: null
                },
                Email: {
                    field: 'Email',
                    defaultValue: null
                },
                Peso: {
                    field: 'Peso',
                    defaultValue: null
                },
                Fecha_Nacimiento: {
                    field: 'Fecha_Nacimiento',
                    defaultValue: new Date()
                }

            },
            CreatedAtFormatted: function () {
                return app.helper.formatDate(this.get('CreatedAt'));
            },
            PictureUrl: function () {
                return app.helper.resolvePictureUrl(this.get('Picture'));
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? {
                    DisplayName: user.DisplayName,
                    PictureUrl: app.helper.resolveProfilePictureUrl(user.Picture)
                } : {
                    DisplayName: 'Anonymous',
                    PictureUrl: app.helper.resolveProfilePictureUrl()
                };
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
            }
        };

        // organizacions data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var personaDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: personasModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Person'
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
            personas: personaDataSource
        };

    }());

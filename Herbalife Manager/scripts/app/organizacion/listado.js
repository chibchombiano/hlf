
var app = app || {};

app.organizacions = (function () {
    'use strict'

    // organizacions model
    var organizacionsModel = (function () {

        var organizacionModel = {

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
        var organizacionsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: organizacionModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Person'
            },
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#no-organizacions-span').hide();
                } else {
                    $('#no-organizacions-span').show();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        return {
            organizacions: organizacionsDataSource
        };

    }());

    // organizacions view model
    var organizacionsViewModel = (function () {

        // Navigate to organizacionView When some organizacion is selected
        var organizacionSelected = function (e) {

            app.mobileApp.navigate('views/organizacion/person.html?uid=' + e.data.uid);
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        var logout = function () {

            app.helper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };

        return {
            organizacions: organizacionsModel.organizacions,
            organizacionSelected: organizacionSelected,
            logout: logout
        };

    }());

    return organizacionsViewModel;

}());


var app = app || {};

app.organizacions = (function () {
    'use strict'

    
    // organizacions view model
    var organizacionsViewModel = (function () {

        // Navigate to organizacionView When some organizacion is selected
        var organizacionSelected = function (e) {
            app.mobileApp.navigate('views/organizacion/person.html?uid=' + e.data.uid+ '&id=' + e.data.id);
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
            organizacions: app.personasDatasource.personas,
            organizacionSelected: organizacionSelected,
            logout: logout
        };

    }());

    return organizacionsViewModel;

}());

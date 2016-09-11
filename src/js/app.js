(() => {
    // gulp build modules
    angular.module('templates', []);

    // views
    angular.module('Intro', []);
    angular.module('Albums', []);

    // services
    angular.module('dataservice', []);

    // directives
    angular.module('loader', []);

    angular.module('AlbumsApp', [
        'ngRoute',
        'templates',
        'Intro',
        'Albums',
    ]).config(appConfig);

    appConfig.$inject = ['$routeProvider'];

    function appConfig($routeProvider) {
        $routeProvider.when('/albums', {
            templateUrl: 'albums.html',
            action: 'Albums.AlbumsCtrl',
        }).otherwise({
            templateUrl: 'intro.html',
        });
    }
})();

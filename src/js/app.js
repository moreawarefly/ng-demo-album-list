(() => {
    // gulp build modules
    angular.module('templates', []);

    // views
    angular.module('albumsApp.intro', []);
    angular.module('albumsApp.albumsList', []);

    angular.module('albumsApp', [
        'ngAnimate',
        'ngRoute',
        'templates',
        'albumsApp.intro',
        'albumsApp.albumsList',
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

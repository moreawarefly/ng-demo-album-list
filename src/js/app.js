(() => {
    angular.module('templates', []);
    angular.module('Intro', []);
    angular.module('Albums', []);

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
        }).otherwise({
            templateUrl: 'intro.html',
            action: 'DashboardApp.DashboardCtrl',
        });
    }
})();

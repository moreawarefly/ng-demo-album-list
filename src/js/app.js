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
        $routeProvider.when('/', {
            templateUrl: 'intro.html',
            action: 'DashboardApp.DashboardCtrl',
        });
    }
})();

(() => {
    angular.
        module('Intro').
        controller('IntroController', IntroController);

    function IntroController() {
        const vm = this;

        vm.test = 'test!';
    }
})();

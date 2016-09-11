(() => {
    angular.
        module('Intro').
        controller('IntroController', IntroController);

    function IntroController() {
        const vm = this;

        vm.test = 'test!';
    }
})();

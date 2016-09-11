(() => {
    angular.
        module('Albums').
        controller('AlbumsController', AlbumsController);

    AlbumsController.$inject = ['dataservice'];

    function AlbumsController(dataservice) {
        const vm = this;

        vm.test = 'test!';
        vm.albums = dataservice.getAlbums();
    }
})();

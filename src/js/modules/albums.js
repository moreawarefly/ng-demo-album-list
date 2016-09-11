(() => {
    angular.
        module('Albums').
        controller('AlbumsController', AlbumsController);

    AlbumsController.$inject = ['dataservice'];

    function AlbumsController(dataservice) {
        const vm = this;

        dataservice.getAlbums().then((response) => {
            vm.albums = response;
        });
    }
})();

(() => {
    angular.
        module('Albums').
        controller('AlbumsController', AlbumsController);

    AlbumsController.$inject = ['dataservice'];

    function AlbumsController(dataservice) {
        const vm = this;

        vm.sortAttribute = 'name';
        vm.sortDescending = false;
        vm.dataLoading = true;

        fetchAlbums();

        function fetchAlbums() {
            dataservice.getAlbums().then((response) => {
                vm.albums = response;
                vm.dataLoading = false;
            });
        }
    }
})();

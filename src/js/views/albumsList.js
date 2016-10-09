(() => {
    angular.
        module('albumsApp.albumsList').
        controller('AlbumsListController', AlbumsListController);

    AlbumsListController.$inject = ['dataservice'];

    function AlbumsListController(dataservice) {
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

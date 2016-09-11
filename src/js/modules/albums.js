(() => {
    angular.
        module('Albums').
        controller('AlbumsController', AlbumsController);

    AlbumsController.$inject = ['dataservice'];

    function AlbumsController(dataservice) {
        const vm = this;

        vm.sortAttribute = 'name';
        vm.sortDescending = false;
        vm.toggleSortingOrder = toggleSortingOrder;

        dataservice.getAlbums().then((response) => {
            vm.albums = response;
        });

        function toggleSortingOrder() {
            vm.sortDescending = !vm.sortDescending;
        }
    }
})();

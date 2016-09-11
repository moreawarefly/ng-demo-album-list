(() => {
    angular.
        module('Albums').
        controller('AlbumsController', AlbumsController);

    AlbumsController.$inject = ['$timeout', 'dataservice'];

    function AlbumsController($timeout, dataservice) {
        const vm = this;

        vm.sortAttribute = 'name';
        vm.sortDescending = false;
        vm.dataLoading = true;
        vm.toggleSortingOrder = toggleSortingOrder;

        fetchAlbums();

        function fetchAlbums() {
            dataservice.getAlbums().then((response) => {
                vm.albums = response;
                vm.dataLoading = false;
            });
        }

        function toggleSortingOrder() {
            vm.sortDescending = !vm.sortDescending;
        }
    }
})();

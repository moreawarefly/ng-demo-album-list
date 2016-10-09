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
        vm.filterKeyword = '';
        vm.filterActive = false;
        vm.filterInputKeyHander = filterInputKeyHander;
        vm.clearFilterHander = clearFilterHander;

        fetchAlbums();

        function fetchAlbums() {
            dataservice.getAlbums().then((response) => {
                vm.albums = response;
                vm.dataLoading = false;
            });
        }

        function filterInputKeyHander(event) {
            if (event.key === 'Enter' || event.key === 'Escape') {
                event.preventDefault();
                document.querySelector('.filter-input').blur();
                vm.filterActive = false;
            }
        }

        function clearFilterHander() {
            vm.filterKeyword = '';
            document.querySelector('.filter-input').blur();
        }
    }
})();

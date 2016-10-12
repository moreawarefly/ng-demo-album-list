(() => {
    angular.
        module('albumsApp.albumsList').
        controller('AlbumsListController', AlbumsListController);

    AlbumsListController.$inject = ['dataservice'];

    function AlbumsListController(dataservice) {
        const vm = this;

        vm.sortAttribute = 'playcount';
        vm.sortDescending = true;
        vm.dataLoading = true;
        vm.filterKeyword = '';
        vm.filterActive = false;
        vm.filterInputKeyHander = filterInputKeyHander;
        vm.filterFunction = filterFunction;

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

        function filterFunction(item) {
            return item.name.toLowerCase().indexOf(vm.filterKeyword.toLowerCase()) !== -1 ||
                item.artist.name.toLowerCase().indexOf(vm.filterKeyword.toLowerCase()) !== -1;
        }
    }
})();

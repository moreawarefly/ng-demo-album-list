(() => {
    angular.
        module('albumsApp').
        service('dataService', dataService);

    dataService.$inject = ['$http', '$log'];

    function dataService($http, $log) {
        this.getAlbums = getAlbums;

        function getAlbums() {
            return $http.get('http://localhost:9001/albums').
                then(getAlbumsSuccess).
                catch(getAlbumsError);

            function getAlbumsSuccess(response) {
                return response.data.topalbums.album;
            }

            function getAlbumsError(error) {
                $log.error(`XHR Error during getting albums: ${error.data}`);
            }
        }
    }
})();

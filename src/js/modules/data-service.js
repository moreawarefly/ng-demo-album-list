angular.
    module('AlbumsApp').
    service('dataservice', dataservice);

dataservice.$inject = ['$http', '$log'];

function dataservice($http, $log) {
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

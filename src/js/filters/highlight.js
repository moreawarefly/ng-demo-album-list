(() => {
    angular.
        module('albumsApp').
        filter('highlight', highlight);

    highlight.$inject = ['$sce'];

    function highlight($sce) {
        return (text, phrase) => {
            const highlightedText = text.replace(
                new RegExp(`(${phrase})`, 'gi'),
                '<mark>$1</mark>'
            );
            return $sce.trustAsHtml(highlightedText);
        };
    }
})();

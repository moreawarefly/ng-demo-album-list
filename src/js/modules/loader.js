(() => {
    angular.
        module('AlbumsApp').
        directive('loader', loader);

    loader.$inject = ['$templateCache', '$compile'];

    function loader($templateCache, $compile) {
        const directive = {
            link,
            scope: {
                loader: '=',
            },
            restrict: 'EA',
        };
        return directive;

        function link(scope, element) {
            let template = angular.element($templateCache.get('_loader.html'));
            template = $compile(template)(scope);
            element.append(template);
        }
    }
})();

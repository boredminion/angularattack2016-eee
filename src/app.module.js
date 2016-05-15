(function() {
    'use strict';

    angular
        .module('reading-ninja', [

            'ngSanitize',
            'ngAnimate',
            'ngMessages',
            'ngTouch',
            'ui.router',
            'ui.bootstrap',

            'reading-ninja.home',
            'reading-ninja.components'

        ])
        .config(appConfig);

    /** @ngInject */
    function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/reading-ninja', '/reading-ninja/home');

        $urlRouterProvider.otherwise('/reading-ninja');

        $stateProvider
            .state('reading-ninja', {
                url: '/reading-ninja',
                abstract: true,
                template: '<ui-view name="appView"></ui-view>'
            });
    }

})();
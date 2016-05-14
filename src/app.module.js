(function() {
    'use strict';

    angular
        .module('reading-ninja', [

            'ngSanitize',
            'ngMessages',
            'ui.router',

            'reading-ninja.home',
            'reading-ninja.services'

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
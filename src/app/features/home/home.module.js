(function(angular) {
    'use strict';
    angular
        .module('reading-ninja.home', [])
        .config(homeConfig);

    // @ngInject
    function homeConfig($stateProvider) {
        $stateProvider
            .state('reading-ninja.home', {
                url: '/home',
                views: {
                    'appView': {
                        templateUrl: 'app/features/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
}(angular));
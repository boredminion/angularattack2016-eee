(function(angular) {
    'use strict';
    angular
        .module('reading-ninja.signUp', [])
        .config(homeConfig);

    // @ngInject
    function homeConfig($stateProvider) {
        $stateProvider
            .state('reading-ninja.signUp', {
                url: '/sign-up',
                views: {
                    'appView': {
                        templateUrl: 'app/features/sign-up/sign-up.html',
                        controller: 'SignUpController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
}(angular));
(function(angular){
    'use strict';
    angular.module('reading-ninja.login')
        .directive('loginButton', loginButton);

    function loginButton(){
        return {
          restrict: 'E',
          templateUrl: 'components/login-button/login-button.html',
          controller: 'loginButtonController',
          controllerAs: 'vm',
          bindToController: true
        };
    }
}(angular));
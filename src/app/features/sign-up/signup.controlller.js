(function (angular) {
    'use strict';
    angular.module('reading-ninja.signUp')
        .controller('SignUpController', SignUpController);

    function SignUpController($state) {
        var vm = this;
        vm.navigate = navigate;

        function navigate(){
            $state.go('reading-ninja.home');
        }
    }
}(angular));
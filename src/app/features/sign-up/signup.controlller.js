(function (angular) {
    'use strict';
    angular.module('reading-ninja.signUp')
        .controller('SignUpController', SignUpController);

    function SignUpController($state, userService) {
        var vm = this;
        vm.navigate = navigate;

        function navigate(formValid) {
            if(formValid) {
                var user = {
                    name: vm.name,
                    password: vm.password,
                    email: vm.email,
                    savedArticles: []
                }
                userService.createUser(user);
                $state.go('reading-ninja.home');
            }
        }
    }
}(angular));
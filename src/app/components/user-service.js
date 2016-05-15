(function (angular) {
    'use strict';

    angular.module('reading-ninja.components')
        .service('userService', userService);

    function userService($q) {
        var self = this;
        self.users = [];

        self.verifyUser = function (user) {
            var deferred = $q.defer();
            var user = _.find(self.users, {
                name: user.name,
                password: user.password
            });

            deferred.resolve(user);

            return deferred.promise;
        };

        self.createUser = function (user) {
            var deferred = $q.defer();
            self.users.push(user);
            deferred.resolve(user);
            return deferred.promise;
        };

        self.updateUser = function (user) {
            console.log(user, self.users);
            var deferred = $q.defer();
            var userFound = _.find(self.users, {
                name: user.name
            });
            console.log(self.users);
            userFound.savedArticles = user.savedArticles;
            deferred.resolve(userFound);
            return deferred.promise;
        };
    }
}(angular));
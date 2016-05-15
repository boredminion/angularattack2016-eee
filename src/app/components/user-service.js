(function (angular) {
    'use strict';

    angular.module('reading-ninja.components')
        .service('userService', userService);

    function userService($q) {
        var self = this;
        var users = [];

        self.createUser = function (user) {
            var deferred = $q.defer();
            users.push(user);
            _.uniq(users);
            deferred.resolve(users);
            return deferred.promise;
        };

        self.getUser = function (user) {
            var deferred = $q.defer();
            var findUser = _.findWhere(users, {name: user.name});
            deferred.resolve(findUser);
            return deferred.promise;
        };

        self.updateUser = function(user, articleObj) {
            var deferred = $q.defer();
            var obj = _.findWhere(users, {name: user.name});
            obj.readObj(articleObj);
            defer.resolve(obj);
            return deferred.promise;
        }
    }
}(angular));
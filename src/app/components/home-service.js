(function(){
    'use strict';

    angular
        .module('reading-ninja.services', [])
        .service('homeService', homeService);

    function homeService($q, $http){
        var self = this;

        self.getArticles = function(params) {
            var deferred = $q.defer();
            var request = {
                url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
                method: 'GET',
                params: params
            };

            $http(request)
                .success(function (result) {
                    deferred.resolve(result);
                }).error(function(error) {
                console.log('error');
                deferred.reject(error);
            });

            return deferred.promise;
        };
        
        return self;

    }

})();
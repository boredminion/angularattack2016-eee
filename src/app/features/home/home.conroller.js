(function() {
    'use strict';

    angular
        .module('reading-ninja.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(homeService) {
        var vm = this;
        vm.title = "Reading ninja home page";
        var params = {
            'api-key': 'ed023a9c67d14448bc9069ea3bd3f8e5',
            q: 'sports'
        }
        // homeService.getArticles(params).then(function (result) {
        //     console.log('result', result);
        // })


    }
})();
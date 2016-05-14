(function() {
    'use strict';

    angular
        .module('reading-ninja.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(homeService) {
        var vm = this;
        vm.title = "Reading ninja home page";
        vm.selectedCategories = [];
        vm.timeValue = 30;
        vm.categories = [{
            name: 'Sports'
        }, {
            name: 'Nature'
        }, {
            name: 'Illinois'
        }, {
            name: 'International'
        }];

        vm.selectCategory = selectCategory;
        vm.timeChanged = timeChanged;

        function timeChanged() {
            console.log(vm.timeValue);
        }

        function selectCategory(category) {
            category.selected = true;
            vm.selectedCategories.push(category);
            
        };
        
        
        var params = {
            'api-key': 'ed023a9c67d14448bc9069ea3bd3f8e5',
            q: 'sports'
        }
        // homeService.getArticles(params).then(function (result) {
        //     console.log('result', result);
        // })


    }
})();
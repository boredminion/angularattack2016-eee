(function() {
    'use strict';

    angular
        .module('reading-ninja.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(homeService) {
        var vm = this;
        vm.title = "Welcome Reading Ninja";
        vm.selectedCategories = [];
        vm.timeValue = 30;
        vm.categories = [{
            name: 'Funny'
        }, {
            name: 'Sports'
        }, {
            name: 'Nature'
        }, {
            name: 'Politics'
        }, {
            name: 'Fashion'
        }, {
            name: 'Movies'
        }, {
            name: 'International'
        }];

        vm.selectCategory = selectCategory;
        vm.timeChanged = timeChanged;

        function timeChanged() {
            console.log(vm.timeValue);
        }

        function selectCategory(category) {
            var params, paramsKey = '';
            category.selected = true;
            vm.selectedCategories.push(category);

            _.forEach(vm.selectedCategories, function (selected, index) {
                paramsKey += selected.name;
                paramsKey += index !== vm.selectedCategories.length - 1 ? ',' : '';
            });

            params = {
                'api-key': 'ed023a9c67d14448bc9069ea3bd3f8e5',
                q: paramsKey,
                sort: 'newest'
            }

            homeService.getArticles(params).then(function (result) {
                console.log('result', result.response.docs);
                vm.articles = result.response.docs;
            })
        };


    }
})();
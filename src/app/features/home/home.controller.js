(function() {
    'use strict';

    angular
        .module('reading-ninja.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(homeService, $filter, $window, $timeout, $state) {
        var vm = this;
        vm.isLogged = false;

        vm.navigate = navigate;
        vm.navigateLoggedIn = navigateLoggedIn;
        vm.templateUrl = 'app/components/login-button/login-button.html';
        vm.rangeSelectorInitialised = false;
        vm.title = "Welcome Reading Ninja";
        vm.selectedCategories = [];
        vm.timeValue = 10;
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
        vm.deleteCategory = deleteCategory;

        function timeChanged() {
            getArticles();
        }

        function deleteCategory(index, category) {
            var categoryObj = _.find(vm.categories, category);
            categoryObj.selected = false;
            vm.selectedCategories.splice(index, 1);
            getArticles();
        }

        function selectCategory(category) {

            category.selected = true;
            vm.selectedCategories.push(category);

            if(!vm.rangeSelectorInitialised) {
                $timeout(function () {
                    $window.document.getElementById('rangeSelector').value = vm.timeValue;
                });
                vm.rangeSelectorInitialised = true;
            }

            getArticles();
        };

        function getArticles() {
            var params, paramsKey = '';
            vm.articles = [];

            _.forEach(vm.selectedCategories, function (selected, index) {
                paramsKey += selected.name;
                paramsKey += index !== vm.selectedCategories.length - 1 ? ',' : '';
            });

            params = {
                'api-key': 'ed023a9c67d14448bc9069ea3bd3f8e5',
                q: paramsKey,
                sort: 'newest'
            };

            homeService.getArticles(params).then(function (result) {
                _.forEach(result.response.docs, function (doc) {
                    var readingTime = $filter('readingTimeFilter')(doc.word_count);
                    if(readingTime - 3 <= vm.timeValue  && vm.timeValue <= readingTime + 3) {
                        vm.articles.push(doc);
                    }
                });
            });
        }

        function navigate() {
            $state.go('reading-ninja.signUp');
        }

        function navigateLoggedIn() {
            vm.isLogged = true;
            $state.go('reading-ninja.home');
        }
    }
})();
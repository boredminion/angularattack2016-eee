(function() {
    'use strict';

    angular
        .module('reading-ninja.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(homeService, $filter, $window, $timeout, userService) {
        var vm = this;

        vm.loginUser = loginUser;
        vm.signOut = signOut;
        vm.templateUrl = 'app/features/home/partials/login.html';
        vm.rangeSelectorInitialised = false;
        vm.title = "Welcome Reading Ninja";
        vm.selectedCategories = [];
        vm.timeValue = 10;
        vm.isReadingTabActive = true;
        vm.categories = [{
            name: 'Funny'
        }, {
            name: 'Sports'
        }, {
            name: 'Nature'
        }, {
            name: 'Movies'
        }, {
            name: 'Fashion'
        }, {
            name: 'Hollywood'
        }, {
            name: 'India'
        }, {
            name: 'International'
        }];

        vm.selectCategory = selectCategory;
        vm.timeChanged = timeChanged;
        vm.deleteCategory = deleteCategory;
        vm.tabChanged = tabChanged;
        vm.read = read;


        init();

        function init() {
            homeService.getArticleOfTheDay().then(function (result  ) {
                var results = result.results;
                var random = Math.floor((Math.random() * (results.length - 1)) + 1);
                vm.articleOfTheDay = {
                    abstract: results[random].abstract,
                    img: results[random].media[0]['media-metadata'][2].url,
                    tags: results[random].des_facet,
                    url: results[random].url
                };
            });
        }

        function timeChanged() {
            getArticlesForReadingTime();
        }

        function deleteCategory(index, category) {
            var categoryObj = _.find(vm.categories, category);
            categoryObj.selected = false;
            vm.selectedCategories.splice(index, 1);
            vm.isReadingTabActive ? getArticlesForReadingTime() : getArticlesMostPopular();
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

            vm.isReadingTabActive ? getArticlesForReadingTime() : getArticlesMostPopular();
        };

        function getArticlesForReadingTime() {
            var params;
            var paramsKey = joinSelectedTypes();

            params = {
                q: paramsKey,
                sort: 'newest'
            };

            homeService.getArticles(params).then(function (result) {
                vm.articles = [];
                vm.articlesError = undefined;
                _.forEach(result.response.docs, function (doc) {
                    var readingTime = $filter('readingTimeFilter')(doc.word_count);
                    if(readingTime - 2 <= vm.timeValue  && vm.timeValue <= readingTime + 2) {
                        vm.articles.push(doc);
                    }
                });
            }, function () {
                vm.articles = [];
                vm.articlesError = 'Sorry, the search API seems to be down, Please try again later';
            });
        }

        function loginUser(formValid) {
            if(formValid) {
                vm.user = {
                    name: vm.name,
                    password: vm.password
                };
                userService.createUser(vm.user).then(function(result) { console.log('Result', result)});
                vm.isLoginPopupOpen = false;
            }
        }

        function tabChanged(reading) {
            vm.isReadingTabActive = reading;
            reading ? getArticlesForReadingTime() : getArticlesMostPopular();
        }

        function getArticlesMostPopular() {
            var paramsKey = joinSelectedTypes();

            vm.articles = [];
            homeService.getArticlesMostPopular(paramsKey).then(function (result) {
                vm.articles = result.results;
            });
        }

        function joinSelectedTypes() {
            var paramsKey = '';

            _.forEach(vm.selectedCategories, function (selected, index) {
                paramsKey += selected.name;
                paramsKey += index !== vm.selectedCategories.length - 1 ? ',' : '';
            });

            return paramsKey;
        }

        function read(favObj) {
            vm.user.readObj = favObj;
        }

        function signOut() {
            vm.user = undefined;
        }
    }
})();
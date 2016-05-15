(function() {
    'use strict';

    angular
        .module('reading-ninja.home')
        .controller('HomeController', HomeController)
        .directive('bookmarkPage', BookmarkPage);
    

    function BookmarkPage($window, $location){
        return {
            restrict: "AEC",
            link: function (scope, element, attrs) {
                $(element).click(function (e) {
                    var bookmarkURL = this.href;
                    var bookmarkTitle = document.title;
                    var triggerDefault = false;

                    if ($window.sidebar && $window.sidebar.addPanel) {
                        // Firefox version < 23
                        $window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
                    } else if (($window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || ($window.opera && $window.print)) {
                        // Firefox version >= 23 and Opera Hotlist
                        var $this = $(this);
                        $this.attr('href', bookmarkURL);
                        $this.attr('title', bookmarkTitle);
                        $this.attr('rel', 'sidebar');
                        $this.off(e);
                        triggerDefault = true;
                    } else if ($window.external && ('AddFavorite' in $window.external)) {
                        // IE Favorite
                        $window.external.AddFavorite(bookmarkURL, bookmarkTitle);
                    } else {
                        // WebKit - Safari/Chrome
                        alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
                        $window.external.AddFavorite(bookmarkURL, bookmarkTitle);
                    }

                    return triggerDefault;
                });
            }

        }
    }

    /** @ngInject */
    function HomeController(homeService, $filter, $window, $timeout, $state, userService) {
        var vm = this;

        vm.navigate = navigate;
        vm.navigateLoggedIn = navigateLoggedIn;
        vm.templateUrl = 'app/components/login-button/login-button.html';
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
                    if(readingTime - 3 <= vm.timeValue  && vm.timeValue <= readingTime + 3) {
                        vm.articles.push(doc);
                    }
                });
            }, function () {
                vm.articles = [];
                vm.articlesError = 'Sorry, the search API seems to be down, Please try again later';
            });
        }

        function navigate() {
            $state.go('reading-ninja.signUp');
        }

        function navigateLoggedIn() {
            vm.user = {
              name: vm.name,
              password: vm.password
            };
            userService.createUser(vm.user).then(function(result) { console.log('Result', result)});
            $state.go('reading-ninja.home');
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
    }
})();
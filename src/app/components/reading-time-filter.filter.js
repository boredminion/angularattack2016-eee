(function(){
    'use strict';

    angular
        .module('reading-ninja.components')
        .filter('readingTimeFilter', readingTimeFilter);

    function readingTimeFilter(){
        return function(input) {
            return Math.round(input/180);
        };
    }

})();
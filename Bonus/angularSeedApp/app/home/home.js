'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'game/game.html',
        controller: 'gameController'
    });
}]);
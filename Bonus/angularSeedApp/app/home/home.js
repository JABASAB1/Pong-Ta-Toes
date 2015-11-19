'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'game/game.html',
        controller: 'gameController'
    });
}]);

$scope.player1score = angular.module('gameModule').player1score;
$scope.player2score = 0;

$scope.player1image = "sam.png";
$scope.player2image = "gollum.png";
'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])
.controller('homeController', ["$scope", "$interval", "$window", function ($scope, $interval, $window) { 

$scope.player1score = angular.module('gameModule').player1score;
$scope.player2score = 0;

$scope.player1image = "sam-cartoon.png";
$scope.player2image = "gollum-cartoon.png";

}]);
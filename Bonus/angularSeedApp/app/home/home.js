'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])
.controller('homeController', ["$scope", "$interval", "$window", function ($scope, $interval, $window) { 

$scope.player1score = 0;
$scope.player2score = 0;

$scope.player1image = "./images/sam-cartoon.png";
$scope.player2image = "./images/gollum-cartoon.png";

$scope.player1name = "Sam";
$scope.player2name = "Gollum";

$scope.audioFiles = [{
	name: 'Potato Song [Default]',
	file: './audio/MashedTaters.mp3'
}, {
	name: '8-Bit Bridge of Khazad Dum',
	file: './audio/BridgeOfKhazadDum-8-bit.mp3'
}];

//$scope.selectedAudio = './audio/MashedTaters.mp3';
$scope.selectedAudio = "";



}]);





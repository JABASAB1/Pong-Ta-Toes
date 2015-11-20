'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
    });
}])
.controller('homeController', ["$scope", "$interval", "$window", "playerService", "$rootScope", function ($scope, $interval, $window, playerService, $rootScope) { 

$scope.player1score = playerService.getPlayerOneScore();
$scope.player2score = playerService.getPlayerTwoScore();

$scope.player1image = playerService.getPlayerOneImage();
$scope.player2image = playerService.getPlayerTwoImage();

$scope.player1name = playerService.getPlayerOneName();
$scope.player2name = playerService.getPlayerTwoName();

$scope.audioFiles = [{
	name: 'Potato Song [Default]',
	file: './audio/MashedTaters.mp3'
}, {
	name: '8-Bit Bridge of Khazad Dum',
	file: './audio/BridgeOfKhazadDum-8-bit.mp3'
}];

//$scope.selectedAudio = './audio/MashedTaters.mp3';
$scope.selectedAudio = "";

$rootScope.$on('scoreChange', function() {
	$scope.player1score = playerService.getPlayerOneScore();
	$scope.player2score = playerService.getPlayerTwoScore();
});

}]);





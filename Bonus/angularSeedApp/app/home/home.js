'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeController',
        controllerAs: 'homeController'
    });
}])
.controller('homeController', ["$interval", "$window", "playerService", function ($interval, $window, playerService) { 

this.player1score = playerService.getPlayerOneScore();
this.player2score = playerService.getPlayerTwoScore();

this.player1image = playerService.getPlayerOneImage();
this.player2image = playerService.getPlayerTwoImage();

this.player1name = playerService.getPlayerOneName();
this.player2name = playerService.getPlayerTwoName();

this.audioFiles = [{
	name: 'Potato Song [Default]',
	file: './audio/MashedTaters.mp3'
}, {
	name: '8-Bit Bridge of Khazad Dum',
	file: './audio/BridgeOfKhazadDum-8-bit.mp3'
}];

//$scope.selectedAudio = './audio/MashedTaters.mp3';
this.selectedAudio = "";


}]);





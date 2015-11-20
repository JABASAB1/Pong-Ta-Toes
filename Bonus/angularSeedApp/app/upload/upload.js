'use strict';

angular.module('myApp.upload', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/upload', {
        templateUrl: 'upload/upload.html',
        controller: 'uploadController'
    });
}])
.controller('uploadController', ["$scope", "$interval", "$window", "playerService", function ($scope, $interval, $window, playerService) {
    $scope.playerOneImage = playerService.getPlayerOneImage();
    $scope.playerTwoImage = playerService.getPlayerTwoImage();

    $scope.playerOneName = playerService.getPlayerOneName();
    $scope.playerTwoName = playerService.getPlayerTwoName();

    $scope.debug = function () {
        playerService.setPlayerOneImage($scope.playerOneImage);
        playerService.setPlayerTwoImage($scope.playerTwoImage);
        playerService.setPlayerOneName($scope.playerOneName);
        playerService.setPlayerTwoName($scope.playerTwoName
    }
}]);
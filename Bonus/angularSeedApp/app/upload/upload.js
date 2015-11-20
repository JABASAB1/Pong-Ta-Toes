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

    $scope.debug = function () {
        alert("Sam Picture: " + $scope.playerOneImage + " Gollum Picture: " + $scope.playerTwoImage);
    }
}]);
'use strict';

angular.module('myApp.upload', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/upload', {
        templateUrl: 'upload/upload.html',
        controller: 'uploadController'
    });
}])
.controller('uploadController', ["$scope", "$interval", "$window", "pictureService", function ($scope, $interval, $window, pictureService) {
    $scope.playerOneImage = pictureService.getPlayerOneImage();
    $scope.playerTwoImage = pictureService.getPlayerTwoImage();

    $scope.debug = function () {
        alert("Sam Picture: " + $scope.playerOneImage + " Gollum Picture: " + $scope.playerTwoImage);
    }
}]);
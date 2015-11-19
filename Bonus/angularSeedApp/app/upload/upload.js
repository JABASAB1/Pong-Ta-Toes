'use strict';

angular.module('myApp.upload', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/upload', {
        templateUrl: 'upload/upload.html',
        controller: 'uploadController'
    });
}])
.controller('uploadController', ["$scope", "$interval", "$window", function ($scope, $interval, $window) {
    $scope.samPicture = "Unset";
    $scope.gollumPicture = "Unset";

    $scope.debug = function () {
        alert("Sam Picture: " + $scope.samPicture + " Gollum Picture: " + $scope.gollumPicture);
    }
}]);
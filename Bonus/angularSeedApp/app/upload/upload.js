'use strict';

angular.module('myApp.upload', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/upload', {
        templateUrl: 'upload/upload.html',
        controller: 'uploadController'
    });
}])
.controller('uploadController', ["$scope", "$interval", "$window", function ($scope, $interval, $window) {}]);
'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

.controller('View2Ctrl', ["$scope", "$interval", "$window", function ($scope, $interval, $window) {
    $scope.height = $window.innerHeight * .8;
    $scope.width = $window.innerWidth * .8;

    function Potato(x, y, vX, vY, w, h) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.w = w;
        this.h = h;
    };

    Potato.prototype.getCoordinates = function () {
        return { x: this.x, y: this.y };
    }

    Potato.prototype.getSize = function () {
        return { w: this.w, h: this.h };
    }

    Potato.prototype.move = function () {
        this.x += this.vX;
        this.y += this.vY;
    }

    Potato.prototype.accelarate = function () {

    }

    var w = $scope.width / 10;
    var h = $scope.height / 10;

    var x = ($scope.width / 2) - (w / 2);
    var y = ($scope.height / 2) - (h / 2);

    $scope.potato = new Potato(x, y, 1, 0, w, h);

    $interval(function () {
        $scope.potato.move();
    }, 10);

    function Player(paddle) {
        this.paddle = paddle;
    }

    Player.prototype.getPaddle()

}]);
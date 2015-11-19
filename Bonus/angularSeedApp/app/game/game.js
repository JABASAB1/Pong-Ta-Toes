'use strict';

angular.module('myApp.game', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'game/game.html',
        controller: 'gameController'
    });
}])

.controller('gameController', ["$scope", "$interval", "$window", function ($scope, $interval, $window) {
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

    var potatoWidth = $scope.width / 10;
    var potatoHeight = $scope.height / 10;

    var potatoX = ($scope.width / 2) - (potatoWidth / 2);
    var potatoY = ($scope.height / 2) - (potatoHeight / 2);

    $scope.potato = new Potato(potatoX, potatoY, 1, 0, potatoWidth, potatoHeight);

    $interval(function () {
        $scope.potato.move();
        $scope.player1.getPaddle().move();
        $scope.player2.getPaddle().move();
    }, 10);

    function Player(paddle, score) {
        this.paddle = paddle;
        this.score = score;
    }

    Player.prototype.getPaddle = function() {
        return this.paddle;
    }

    function Paddle(x, y, v, w, h) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.w = w;
        this.h = h;
    }

    Paddle.prototype.getCoordinates = function () {
        return { x: this.x, y: this.y };
    }

    Paddle.prototype.getSize = function () {
        return { w: this.w, h: this.h };
    }

    Paddle.prototype.move = function () {
        this.y += this.v;
    }

    var paddleWidth = $scope.width / 50;
    var paddleHeight = $scope.height / 5;
    var paddle1X = paddleWidth;
    var paddle2X = $scope.width - paddleWidth;
    var paddleY = ($scope.height / 2) - (paddleHeight/2);

    var paddle1 = new Paddle(paddle1X, paddleY, 0, paddleWidth, paddleHeight);

    var paddle2 = new Paddle(paddle2X, paddleY, 0, paddleWidth, paddleHeight);

    $scope.player1 = new Player(paddle1, 0);
    $scope.player2 = new Player(paddle2, 0);

}]);
'use strict';

angular.module('myApp.game', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/game', {
        templateUrl: 'game/game.html',
        controller: 'gameController'
    });
}])

.controller('gameController', ["$scope", "$interval", "$window", "$document", function ($scope, $interval, $window, $document) {
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
        if (this.x + this.w*.3 < 0) {
            $scope.player2.awardPoint();
            $scope.potato = new Potato(potatoX, potatoY, -1, 0, potatoWidth, potatoHeight);
        } else if (this.x + this.w*.7 > $scope.width) {
            $scope.player1.awardPoint();
            $scope.potato = new Potato(potatoX, potatoY, 1, 0, potatoWidth, potatoHeight);
        }
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

    Player.prototype.awardPoint = function () {
        this.score += 1;
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

    Paddle.prototype.accelerate = function (up) {
        if (up) {
            this.v = -2;
        } else {
            this.v = 2;
        }
    }

    Paddle.prototype.stop = function (up) {
        if (up && this.v < 0) {
            this.v = 0;
        } else if (!up && this.v > 0) {
            this.v = 0;
        }
    }

    var paddleWidth = $scope.width / 50;
    var paddleHeight = $scope.height / 5;
    var paddle1X = paddleWidth;
    var paddle2X = $scope.width - paddleWidth*2;
    var paddleY = ($scope.height / 2) - (paddleHeight / 2);
    
    Paddle.prototype.move = function () {
        if (this.y + this.v >= 0 && this.y + this.v + this.h <= $scope.height) {
            this.y += this.v;
        } else {
        }
    }

    var paddle1 = new Paddle(paddle1X, paddleY, 0, paddleWidth, paddleHeight);

    var paddle2 = new Paddle(paddle2X, paddleY, 0, paddleWidth, paddleHeight);

    $scope.player1 = new Player(paddle1, 0);
    $scope.player2 = new Player(paddle2, 0);

    $document.bind('keydown', function (e) {
        switch (e.which) {
            case 38:
                //up
                paddle2.accelerate(true);
                break;
            case 40:
                paddle2.accelerate(false);
                //down
                break;
            case 83:
                //up
                paddle1.accelerate(true);
                break;
            case 88:
                //down
                paddle1.accelerate(false);
                break;
        }
    });

    $document.bind('keyup', function (e) {
        switch (e.which) {
            case 38:
                //up
                paddle2.stop(true);
                break;
            case 40:
                //down
                paddle2.stop(false);
                break;
            case 83:
                //up
                paddle1.stop(true);
                break;
            case 88:
                //down
                paddle1.stop(false);
                break;
        }
    });

}]);
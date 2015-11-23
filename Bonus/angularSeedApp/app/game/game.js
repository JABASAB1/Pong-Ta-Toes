'use strict';

angular.module('myApp.game', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/game', {
        templateUrl: 'game/game.html',
        controller: 'gameController'
    });
}])

.controller('gameController', ["$scope", "$interval", "$window", "$document", "playerService", "$rootScope", function ($scope, $interval, $window, $document, playerService, $rootScope) {

    $scope.$on("$destroy", function () {
        $interval.cancel($scope.gameInterval);
    });

    $scope.height = $window.innerHeight * .65;
    $scope.width = $window.innerWidth * .6;

    var messages = ['Spudtastic!','Taterrific!','Sweet! (potato)', 'Tuberful!','Gravy!']

    var showRandomMessage = function () {
        
        var r = Math.round(Math.random() * 4);
        $scope.message = messages[r];
        $scope.messageDisplay = "";

        $interval(function () {
            $scope.messageDisplay = "none";
        }, 1000, 1);
    }

    function Potato(x, y, vX, vY, w, h, vR) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.w = w;
        this.h = h;
        this.r = 0;
        this.vR = vR;
    };

    Potato.prototype.getCoordinates = function () {
        return { x: this.x, y: this.y };
    }

    Potato.prototype.getSize = function () {
        return { w: this.w, h: this.h };
    }

    Potato.prototype.bounce = function (paddle) {
        if (this.vX > 0) {
            this.vX += .2;
        } else {
            this.vX -= .2;
        }

        if (paddle) {
            if (paddle.power) {
                showRandomMessage();
                if (this.vX > 0) {
                    this.vX += 1;
                } else {
                    this.vX -= 1;
                }
                this.vX = (this.vX) * -1;
            } else if (this.vX > 3 || this.vX < -3) {
                this.vX = (this.vX) * -.3;
            } else {
                this.vX = (this.vX) * -1;
            }
        }
        

        if (paddle) {
            var startingV = this.vY;
            if (startingV == 0) {
                if (Math.random() > .5) {
                    startingV = Math.random()/2;
                } else {
                    startingV = -Math.random()/2;
                }
            }

            this.vY = startingV + paddle.getVelocity() / 2;
            this.vR = this.vR + paddle.getVelocity() / 2;

        } else {
            this.vY = this.vY * -1;

        }
    }

    Potato.prototype.move = function () {

        if (this.vX > 0) {
            if($scope.player2.getPaddle().collide(this)){
                this.bounce($scope.player2.getPaddle());
            }
        } else {
            if($scope.player1.getPaddle().collide(this)){
                this.bounce($scope.player1.getPaddle());
            }
        }

        if (this.vY < 0) {
            if (this.y < 0) {
                this.bounce();
            }
        } else {
            if (this.y + this.h > $scope.height) {
                this.bounce();
            }
        }

        this.r += this.vR;
        this.x += this.vX;
        this.y += this.vY;

        if (this.x < 0) {
            $scope.player2.awardPoint();
            playerService.setPlayerTwoScore($scope.player2.score);
            $rootScope.$broadcast('scoreChange');

            if ($scope.player2.score == 5) {
                $scope.message = playerService.getPlayerTwoName() + " wins!";
                $scope.messageDisplay = "";

                $scope.paused = true;
                $scope.pauseButtonText = 'Pause';
                $scope.startButtonDisplay = 'none';
                $scope.pauseButtonDisplay = 'none';
                $scope.resetButtonDisplay = '';

                $scope.player1 = null;
                $scope.player2 = null;

                $rootScope.$broadcast('gameEnd');

            } else {

                $scope.message = "Boil 'em, mash 'em!";

                $scope.messageDisplay = "";

                $interval(function () {
                    $scope.messageDisplay = "none";
                }, 1000, 1);

                $scope.potato = new Potato(potatoX, potatoY, -.5, 0, potatoWidth, potatoHeight, -.1);

            }
        } else if (this.x + this.w > $scope.width) {
            $scope.player1.awardPoint();
            playerService.setPlayerOneScore($scope.player1.score);
            $rootScope.$broadcast('scoreChange');

            if ($scope.player1.score == 5) {
                $scope.message = playerService.getPlayerOneName() + " wins!";
                $scope.messageDisplay = "";

                $scope.paused = true;
                $scope.pauseButtonText = 'Pause';
                $scope.startButtonDisplay = 'none';
                $scope.pauseButtonDisplay = 'none';
                $scope.resetButtonDisplay = '';

                $scope.player1 = null;
                $scope.player2 = null;

                $rootScope.$broadcast('gameEnd');

            } else {

                $scope.message = "Boil 'em, mash 'em!";
                $scope.messageDisplay = "";

                $interval(function () {
                    $scope.messageDisplay = "none";
                    }, 1000, 1);
               $scope.potato = new Potato(potatoX, potatoY, .5, 0, potatoWidth, potatoHeight, .1);
             }
        }
    }

    Potato.prototype.getVelocity = function () {
        return { x: this.vX, y: this.vY };
    }

    var potatoHeight = $scope.height / 10;
    var potatoWidth = potatoHeight;

    var potatoX = ($scope.width / 2) - (potatoWidth / 2);
    var potatoY = ($scope.height / 2) - (potatoHeight / 2);

    $scope.startButtonDisplay = '';
    $scope.pauseButtonDisplay = 'none';
    $scope.resetButtonDisplay = 'none';
    $scope.pauseButtonText = 'Pause';
    
    var paddleWidth = $scope.width / 50;
    var paddleHeight = $scope.height / 5;
    var paddle1X = paddleWidth;
    var paddle2X = $scope.width - paddleWidth*2;
    var paddleY = ($scope.height / 2) - (paddleHeight / 2);

    $scope.startGame = function () {

        $scope.messageDisplay = "none";

        playerService.setPlayerOneScore(0);
        playerService.setPlayerTwoScore(0);
        $rootScope.$broadcast('scoreChange');

        $scope.paused = false;
        $scope.pauseButtonText = 'Pause';
        $scope.startButtonDisplay = 'none';
        $scope.pauseButtonDisplay = '';
        $scope.resetButtonDisplay = '';

        $scope.potato = new Potato(potatoX, potatoY, .5, 0, potatoWidth, potatoHeight, .1);
        
        var paddle1 = new Paddle(paddle1X, paddleY, 0, paddleWidth, paddleHeight, 'green');

        var paddle2 = new Paddle(paddle2X, paddleY, 0, paddleWidth, paddleHeight, 'red');

        $scope.player1 = new Player(paddle1, 0);
        $scope.player2 = new Player(paddle2, 0);

        if (!$scope.gameInterval) {

            $scope.gameInterval = $interval(function () {
                if (!$scope.paused) {
                    $scope.player1.getPaddle().move();
                    $scope.player2.getPaddle().move();
                    $scope.potato.move();
                }
             }, 5);
         }
    };

    $scope.pauseGame = function () {
        if ($scope.player1){
            if ($scope.paused) {
                $scope.paused = false;
                $scope.pauseButtonText = "Pause"
            } else {
                $scope.paused = true;
                $scope.pauseButtonText = "Resume"
            }
        }
    };

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

    function Paddle(x, y, v, w, h, color) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.w = w;
        this.h = h;
        this.hit = false;

        var p = this;

        $interval(function () {
            p.hit = true;
            p.color = color;
            p.toggleTurbo(true);
        }, 10000, 1);
    }

    Paddle.prototype.getCoordinates = function () {
        return { x: this.x, y: this.y };
    }

    Paddle.prototype.getSize = function () {
        return { w: this.w, h: this.h };
    }

    Paddle.prototype.accelerate = function (up) {
        if (this.turbo) {
            var accel = 2;
        } else {
            var accel = 1;
        }

        if (up) {
            this.v = -1 * accel;
        } else {
            this.v = 1 * accel;
        }
    }

    Paddle.prototype.stop = function (up) {
        if (up && this.v < 0) {
            this.v = 0;
        } else if (!up && this.v > 0) {
            this.v = 0;
        }
    }

    Paddle.prototype.getVelocity = function () {
        return this.v;
    }
    
    Paddle.prototype.move = function () {
        if (this.y + this.v >= 5 && this.y + this.v + this.h <= $scope.height-5) {
            this.y += this.v;
        }
    }

    Paddle.prototype.collide = function (potato) {
        if (potato.getVelocity().x > 0) {
            if (potato.getCoordinates().x + potato.getSize().w > this.x) {
                if(potato.getCoordinates().y +potato.getSize().h > this.y && potato.getCoordinates().y < this.y +this.h) {
                    return true;
                }
            }
        } else {
            if (potato.getCoordinates().x < this.x + this.w) {
                if (potato.getCoordinates().y +potato.getSize().h > this.y && potato.getCoordinates().y < this.y +this.h) {
                    return true;
                }
            }
        }
        
    }

    Paddle.prototype.powerHit = function (left) {
        if (this.hit) {
            if (left) {
                this.x -= this.w;
            } else {
                this.x += this.w;
            }
            this.hit = false;
            var color = this.color;
            this.power = true;
            var p = this;

            $interval(function () {
                if (left) {
                    p.x += p.w;
                } else {
                    p.x -= p.w;
                }
                p.power = false;
                p.color = "Black";
                p.toggleTurbo(false);
            }, 100, 1);

            $interval(function () {
                p.hit = true;
                p.color = color;
                p.toggleTurbo(true);
            }, 10000, 1);
        }
    }

    Paddle.prototype.toggleTurbo = function (enable) {
        if (enable) {
            this.turbo = true;
            if (this.v > 0) {
                this.v = 2;
            } else if(this.v < 0){
                this.v = -2;
            }
        } else {
            this.turbo = false;
            if (this.v > 0) {
                this.v = 1;
            } else if (this.v < 0) {
                this.v = -1;
            }
        }
    }

    $document.bind('keydown', function (e) {
        if ($scope.player1){
            switch (e.which) {
                case 38:
                    //up
                    $scope.player2.getPaddle().accelerate(true);
                    break;
                case 40:
                    $scope.player2.getPaddle().accelerate(false);
                    //down
                    break;
                case 37:
                    //left
                    $scope.player2.getPaddle().powerHit(true);
                    break;
                case 83:
                    //up
                    $scope.player1.getPaddle().accelerate(true);
                    break;
                case 88:
                    //down
                    $scope.player1.getPaddle().accelerate(false);
                    break;
                case 68:
                case 67:
                    //right
                    $scope.player1.getPaddle().powerHit(false);
                    break;
                case 80:
                    //pause
                    $scope.pauseGame();
                    break;
                }
            }
    });

    $document.bind('keyup', function (e) {
        if ($scope.player1){
        switch (e.which) {
            case 38:
                //up
                $scope.player2.getPaddle().stop(true);
                break;
            case 40:
                //down
                $scope.player2.getPaddle().stop(false);
                break;
            case 83:
                //up
                $scope.player1.getPaddle().stop(true);
                break;
            case 88:
                //down
                $scope.player1.getPaddle().stop(false);
                break;
            }
        }
    });

}]);
angular.module('myApp').service('playerService', function () {
    var playerOneImage = "./images/sam-cartoon.png";;
    var playerTwoImage = "./images/gollum-cartoon.png";

    var playerOneName = "Sam";
    var playerTwoName = "Gollum"

    var playerOneScore = 0;
    var playerTwoScore = 0;

    this.getPlayerOneImage = function () {
        return playerOneImage;
    };
    
    this.setPlayerOneImage = function (newImage) {
        this.playerOneImage = newImage;
    };

    this.getPlayerTwoImage = function () {
        return playerTwoImage;
    };
    
    this.setPlayerTwoImage = function (newImage) {
        this.playerTwoImage = newImage;
    };

    this.getPlayerOneName = function () {
        return playerOneName;
    };

    this.getPlayerTwoName = function () {
        return playerTwoName;
    };

    this.getPlayerOneScore = function () {
        return playerOneScore;
    };

    this.getPlayerTwoScore = function () {
        return playerTwoScore;
    }
});
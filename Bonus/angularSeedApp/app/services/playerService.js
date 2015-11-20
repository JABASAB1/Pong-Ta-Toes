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
        playerOneImage = newImage;
    };

    this.getPlayerTwoImage = function () {
        return playerTwoImage;
    };
    
    this.setPlayerTwoImage = function (newImage) {
        playerTwoImage = newImage;
    };

    this.getPlayerOneName = function () {
        return playerOneName;
    };

    this.setPlayerOneName = function (newName) {
        playerOneName = newName;
    };

    this.getPlayerTwoName = function () {
        return playerTwoName;
    };

    this.setPlayerTwoName = function (newName) {
        playerTwoName = newName;
    };

    this.getPlayerOneScore = function () {
        return playerOneScore;
    };

    this.setPlayerOneScore = function (newScore) {
        playerOneScore = newScore;
    };

    this.getPlayerTwoScore = function () {
        return playerTwoScore;
    }

    this.setPlayerTwoScore = function (newScore) {
        playerTwoScore = newScore;
    };
});
angular.module('myApp').service('pictureService', function () {
    var playerOneImage = "Unset";
    var playerTwoImage = "Unset";

    var playerOneName = "Sam";
    var playerTwoName = "Gollum"

    this.getPlayerOneImage = function () {
        return playerOneImage;
    };

    this.getPlayerTwoImage = function () {
        return playerTwoImage;
    };
});
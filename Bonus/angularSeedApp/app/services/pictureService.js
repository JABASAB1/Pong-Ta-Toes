angular.module('myApp').service('pictureService', function () {
    var playerOneImage = "Unset";
    var playerTwoImage = "Unset";

    this.getPlayerOneImage = function () {
        return playerOneImage;
    };

    this.getPlayerTwoImage = function () {
        return playerTwoImage;
    };
});
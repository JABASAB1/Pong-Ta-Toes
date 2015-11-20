'use strict';

angular.module('myApp.scores', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/scores', {
        templateUrl: 'scores/scores.html',
        controller: 'scoresController'
    });
}])
.controller('scoresController', ["$scope", "$interval", "$window", "playerService", "$rootScope", function ($scope, $interval, $window, playerService, $rootScope) {

    function GameScore(playerOneName, playerOneScore, playerTwoName, playerTwoScore) {
        this.playerOneName = playerOneName;
        this.playerOneScore = playerOneScore;
        this.playerTwoName = playerTwoName;
        this.playerTwoScore = playerTwoScore;
    }

    var debug = [{ playerOneName: "Jesse", playerOneScore: "100", playerTwoName: "Meelay", playerTwoScore: "0" }
        , { playerOneName: "Jesse", playerOneScore: "200", playerTwoName: "Meelay", playerTwoScore: "0" }
        , { playerOneName: "Jesse", playerOneScore: "300", playerTwoName: "Meelay", playerTwoScore: "0" }];
        
    localStorage.setItem('scoresHistory', JSON.stringify(debug));

    $scope.scores = [];
    if (localStorage.getItem('scoresHistory')) {
        $scope.scores = JSON.parse(localStorage.getItem('scoresHistory'));
    }
        
        //localStorage.getItem('scoresHistory');


    $rootScope.$on('gameEnd', function() {
        var player1score = playerService.getPlayerOneScore();
        var player2score = playerService.getPlayerTwoScore();
        var player1name = playerService.getPlayerOneName();
        var player2name = playerService.getPlayerTwoName();

        var scoreRecord = new GameScore(player1score, player2score, player1name, player2name);

        $scope.scores.push(scoreRecord);

        localStorage.setItem("scoresHistory", JSON.stringify($scope.scores));
    });
}]);
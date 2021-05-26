angular.module("meanGames").controller("GameOneController",GameOneController);

function GameOneController($http, $routeParams, GameDataFactory){
    console.log("GameController is called");
    let vm=this;
    const gameId = $routeParams.gameId;
    GameDataFactory.getOneGame($http,gameId).then(function(response) {
        vm.game = response;
    })
}
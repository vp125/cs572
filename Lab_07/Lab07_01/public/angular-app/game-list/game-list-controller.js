angular.module("meanGames").controller("GameController",GameController);

function GameController($http, GameDataFactory){
    console.log("GameController is called");
    let vm=this;
    GameDataFactory.getAllGames($http).then(function(response) {
        vm.games = response;
    })
}
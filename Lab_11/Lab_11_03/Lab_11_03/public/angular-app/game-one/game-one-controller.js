angular.module("meanGames").controller("GameOneController",GameOneController);

function GameOneController($http, $routeParams, GameDataFactory,AuthFactory){
    console.log("GameOneController is called");
    let vm=this;
    const gameId = $routeParams.gameId;
    GameDataFactory.getOneGame(gameId).then(function(response) {
        vm.game = response;
        vm.rating = _getStarRating(vm.game.rate);
        vm.editedGamePrice = vm.game.price;
        vm.editedGameMinPlayers = vm.game.minPlayers;
        vm.editedGameMaxPlayers = vm.game.maxPlayers;
        vm.editedGameMinAge = vm.game.minAge;
    });

    vm.updateGame = function() {
        const editedGame = {
            title: vm.game.title,
            year: vm.game.year,
            rate: vm.game.rate,
            price: vm.editedGamePrice,
            minPlayers: vm.editedGameMinPlayers,
            maxPlayers: vm.editedGameMaxPlayers,
            minAge: vm.editedGameMinAge,
            designers: vm.game.designers,
            publishers: vm.game.publishers
        }
        GameDataFactory.replaceOneGame(gameId,editedGame).then(function(response){
            console.log("Game Updated");
        }).catch(function(error){
            console.log(error);
        });
    }
    vm.isLoggedIn = function() {
        return AuthFactory.auth.isLoggedIn;
    }
}

function _getStarRating(stars){
    return new Array(stars);
}
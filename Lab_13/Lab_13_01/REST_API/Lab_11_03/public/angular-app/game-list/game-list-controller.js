angular.module("meanGames").controller("GameController",GameController);

function GameController($route, GameDataFactory,AuthFactory){
    console.log("GameController is called");
    let vm=this;
    vm.isSubmitted = false;
    GameDataFactory.getAllGames().then(function(response) {
        vm.games = response;
    });

    vm.addGame=function() {
        const newGame= {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            rate: vm.newGameRating,
            year: vm.newGameYear,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge,
            designers: vm.newGameDesigner
        };
        if(vm.gameForm.$valid) {
            console.log(newGame);
            GameDataFactory.addOneGame(newGame).then(function(response) {
                console.log(response);
                console.log("Game Saved");
                vm.message = "Game was added succesfully";
                //$route.reload();
            }).catch(function(error) {
                console.log(error);
                vm.err = "Game was failed to add";
            });
        } else {
            vm.isSubmitted = true;
        }
    }
    vm.isLoggedIn = function() {
        return AuthFactory.auth.isLoggedIn;
    }
}
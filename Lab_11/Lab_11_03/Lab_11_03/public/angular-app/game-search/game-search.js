angular.module("meanGames").controller("GameSearchController",GameSearchController);

function GameSearchController($route,$routeParams, $location, GameDataFactory){
    console.log("GameSearch Controller is called");
    let vm=this;    

    vm.searchGame=function(){
        const searchGame = {
            title: vm.searchGameTitle,
            year: vm.searchGameYear,
            rate: vm.searchGameRating
        };
        GameDataFactory.searchGame(searchGame).then(function(response) {
            console.log("Games found");
            vm.games = response;
        }).catch(function(error) {
            vm.err = "No result found";
            console.log(error);
        })
    } 
}


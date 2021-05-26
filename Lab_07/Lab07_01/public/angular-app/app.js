angular.module("meanGames",['ngRoute']).config(config);

function config($routeProvider){
    console.log("Reach app.js");
    $routeProvider.when("/",{
        templateUrl: "angular-app/game-list/game-list.html",
        controller: "GameController",
        controllerAs: "gameCtrl"
    }).when("/games/:gameId",{
        templateUrl: "angular-app/game-one/game-one.html",
        controller: "GameOneController",
        controllerAs: "gameCtrl"
    });
}
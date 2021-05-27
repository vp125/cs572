angular.module("meanGames",['ngRoute']).config(config);

function config($routeProvider,$locationProvider){
    console.log("Reach app.js");
    //$locationProvider.hasPrefix("");
    $routeProvider.when("/",{
        templateUrl: "angular-app/game-list/game-list.html",
        controller: "GameController",
        controllerAs: "vm"
    }).when("/games/:gameId",{
        templateUrl: "angular-app/game-one/game-one.html",
        controller: "GameOneController",
        controllerAs: "vm"
    });
}
angular.module("meanGames").directive("gameRating",GameRating);

function GameRating(){
    return {
        restrict: "E",
        templateUrl: "angular-app/game-rating-directive/rating.html",
        // bindToController: true,
        // controller: "GameOneController",
        // controllerAs: "vm",
        transclude: true,
        scope: {
            stars : "=rating"
        }
    }
}
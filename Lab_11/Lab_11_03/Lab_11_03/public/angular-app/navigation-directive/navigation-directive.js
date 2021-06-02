angular.module("meanGames").directive("gamesNavigation",gamesNavigation);

function gamesNavigation() {
    console.log("gamesNavigation is called");
    return {
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}



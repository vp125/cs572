angular.module("meanMovies").directive("moviesNavigation",moviesNavigation);

function moviesNavigation() {
    console.log("moviesNavigation is called");
    return {
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}



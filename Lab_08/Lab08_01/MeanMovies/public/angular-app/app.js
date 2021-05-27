angular.module("meanMovies",['ngRoute']).config(config);

function config($routeProvider){
    console.log("Reach app.js");
    $routeProvider.when("/",{
        templateUrl: "angular-app/movie-list/movie-list.html",
        controller: "MovieController",
        controllerAs: "vm"
    }).when("/movies/:movieId",{
        templateUrl: "angular-app/movie-one/movie-one.html",
        controller: "MovieOneController",
        controllerAs: "vm"
    });
}
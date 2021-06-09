angular.module("meanMovies",['ngRoute','angular-jwt']).config(config);

function config($httpProvider, $routeProvider,$locationProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
    console.log("Reach app.js");
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl: "angular-app/welcome/welcome.html",        
    }).when("/movies",{
            templateUrl: "angular-app/movie-list/movie-list.html",
            controller: "MovieController",
            controllerAs: "vm"
    }).when("/movies/:movieId",{
        templateUrl: "angular-app/movie-one/movie-one.html",
        controller: "MovieOneController",
        controllerAs: "vm"
    }).when("/register",{
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm",
        access : {restricted: false}
    }).when("/profile",{
        templateUrl: "angular-app/profile/profile.html",
        access : {restricted: true}
    }).when("/search",{
        templateUrl: "angular-app/movie-search/movie-search.html",
        controller: "MovieSearchController",
        controllerAs: "vm",
        access : {restricted: false}
    }).otherwise({
        redirectTo : "/"
    });    
}
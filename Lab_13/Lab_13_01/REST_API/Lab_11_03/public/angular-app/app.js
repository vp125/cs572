angular.module("meanGames",['ngRoute','angular-jwt']).config(config).run(changeRoute);

function config($httpProvider, $routeProvider,$locationProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
    console.log("Reach app.js");
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl: "angular-app/welcome/welcome.html",
        access : {restricted: false}
    }).when("/games",{
        templateUrl: "angular-app/game-list/game-list.html",
        controller: "GameController",
        controllerAs: "vm",
        access : {restricted: false}
    }).when("/games/:gameId",{
            templateUrl: "angular-app/game-one/game-one.html",
            controller: "GameOneController",
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
        templateUrl: "angular-app/game-search/game-search.html",
        controller: "GameSearchController",
        controllerAs: "vm",
        access : {restricted: false}
    }).otherwise({
        redirectTo : "/"
    });
}

function changeRoute($rootScope, $location,$window,AuthFactory) {
    console.log("RUN");
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        console.log(nextRoute);
        // This is to enable overcoming restricted URLs
        if(nextRoute.access !== undefined && nextRoute.access.restricted
           && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path("/");
        }
    })
}
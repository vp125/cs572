
var app = angular.module("myProperApp", ['ngRoute']);

app.config(config);

function config($routeProvider){
    console.log("CONFIG is called");
    $routeProvider.when("/", {
        templateUrl: "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"
    }).when("/about", {
        templateUrl: "about/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    }).when("/bitcoin", {
        templateUrl: "bitcoin/bitcoin.html",
        controller: "BitCoinController",
        controllerAs: "bitcoinCtrl"
    }).otherwise({
        redirect: "/"
    });
}
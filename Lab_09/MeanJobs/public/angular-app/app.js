angular.module("meanJobs",['ngRoute']).config(config);

function config($routeProvider){
    console.log("Reach app.js");
    $routeProvider.when("/",{
        templateUrl: "angular-app/job-list/job-list.html",
        controller: "JobController",
        controllerAs: "vm"
    }).when("/jobs/:jobId",{
        templateUrl: "angular-app/job-one/job-one.html",
        controller: "JobOneController",
        controllerAs: "vm"
    }).when("/jobs/:jobId/location",{
        templateUrl: "angular-app/location/location.html",
        controller: "LocationController",
        controllerAs: "vm"
    }).when("/jobs/:jobId/location/add",{
        templateUrl: "angular-app/location/location-add.html",
        controller: "LocationController",
        controllerAs: "vm"
    });
}
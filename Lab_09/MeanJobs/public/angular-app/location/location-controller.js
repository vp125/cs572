angular.module("meanJobs").controller("LocationController",LocationController);

function LocationController($route,$location,$routeParams, LocationDataFactory) {
    let vm = this;
    vm.jobId = $routeParams.jobId;

    LocationDataFactory.getLocation(vm.jobId).then(function(response) {
        vm.location = response;
        vm.editedLocationCity = vm.location.city;
        vm.editedLocationState = vm.location.state;
        vm.editedLocationZipCode = vm.location.zipCode;

    }).catch(function(error) {
        console.log(error);
    });

    vm.addLocation = function() {
        const newLocation = {
            city: vm.newLocationCity,
            state: vm.newLocationState,
            zipCode: vm.newLocationZipCode
        };
        LocationDataFactory.addLocation(vm.jobId,newLocation).then(function(response) {
            console.log("Location Added");
            $location.path("/jobs/"+vm.jobId+"/location");
        }).catch(function(error) {
            console.log(error);
        });
    }

    vm.updateLocation = function() {
        const newLocation = {
            city: vm.editedLocationCity,
            state: vm.editedLocationState,
            zipCode: vm.editedLocationZipCode
        };
        LocationDataFactory.updateLocation(vm.jobId,newLocation).then(function(response) {
            console.log("Location Updated");
            $route.reload();
        }).catch(function(error) {
            console.log(error);
        });
    }
}
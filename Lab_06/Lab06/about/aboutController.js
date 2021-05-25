angular.module("myProperApp").controller("AboutController", AboutControllerFunc);

function AboutControllerFunc() {
    var vm = this;
    vm.about = "This is my bio";
}
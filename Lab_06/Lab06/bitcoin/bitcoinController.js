angular.module("myProperApp").controller("BitCoinController",BitCoinController);

function BitCoinController($http){
    const apiUrl = "https://api.coincap.io/v2/assets"
    let vm = this;    
    $http.get(apiUrl).then(function(response) {
            vm.bitcoins = response.data.data;
    });
}
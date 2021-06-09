angular.module("meanMovies").controller("RegisterController",RegisterController);

function RegisterController($http) {
    const vm = this;
    vm.register = function() {
        const newUser= {
            name: vm.name,
            username: vm.username,
            password: vm.password
        };

        if(!vm.username || !vm.password){
            vm.err= "Please add a username and password";
        } else {
            if(vm.password !== vm.passwordRepeat) {
                vm.err = "Please make sure the password match";
            } else {
                $http.post("/api/users",newUser).then(function(response) {
                    console.log(response);
                    vm.message = "Successful registration, please login";
                }).catch(function(error) {
                    console.log(error);
                })
            }
        }
    }
}
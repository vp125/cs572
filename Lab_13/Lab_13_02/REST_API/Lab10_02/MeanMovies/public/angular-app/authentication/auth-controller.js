angular.module("meanMovies").controller("AuthenticateController",AuthenticateController);

function AuthenticateController($http,$localStorage,$location) {
    const vm = this;    
    vm.login = function() {
        const user= {            
            username: vm.username,
            password: vm.password
        };

        if(!vm.username || !vm.password){
            vm.err= "Please add a username and password";
        } else {
            $http.post("/api/auth",user).then(function(response) {
                $localStorage.currentUser = { username: username, token: response.token };
                vm.userLoggedin = true;
                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                console.log(response);
                vm.message = "Successful login";
                $location.path("/");
            }).catch(function(error) {
                vm.userLoggedin = false;
                console.log(error);
                vm.err = "username or password is incorrect!";
            });            
        }
    }

    vm.logout = function() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        vm.userLoggedin = false;
        $http.defaults.headers.common.Authorization = '';
    }
}
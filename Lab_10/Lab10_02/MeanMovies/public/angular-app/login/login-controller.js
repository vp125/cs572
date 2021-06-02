angular.module("meanMovies").controller("LoginController",LoginController);

function LoginController($location,AuthFactory,UserDataFactory,$window,jwtHelper) {
    const vm=this;

    vm.isActiveTab = function(url){
        const currentPath= $location.path().split("/")[1];
        return (url=== currentPath ? "active": "");
    }

    vm.isLoggedIn = function() {
        return AuthFactory.auth.isLoggedIn;
    }

    vm.login = function() {
        if(vm.username && vm.password) {
            const user = {
                username: vm.username,
                password: vm.password
            };
            UserDataFactory.login(user).then(function(response) {
                console.log(response);
                if(response && response.success){
                    $window.sessionStorage.token = response.token;
                    AuthFactory.auth.isLoggedIn = true;
                    // Read the payload off of the token
                    const token = $window.sessionStorage.token;
                    const decodedToken = jwtHelper.decodeToken(token);
                    console.log(decodedToken);
                    vm.loggedinUser = decodedToken.name;
                    vm.username = "";
                    vm.password = "";
                    $location.path("/");
                }
            }).catch(function(error) {
                console.log(error);
            })
        };
    }

    vm.logout = function() {
        delete $window.sessionStorage.token;
        AuthFactory.auth.isLoggedIn = false;
        $location.path("/");
    }
}



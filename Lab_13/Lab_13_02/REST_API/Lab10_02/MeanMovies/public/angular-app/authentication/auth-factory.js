angular.module("meanMovies").factory("AuthFactory",AuthFactory);

function AuthFactory() {
    var auth = {isLoggedIn: false};
    return {
        auth: auth
    };
}
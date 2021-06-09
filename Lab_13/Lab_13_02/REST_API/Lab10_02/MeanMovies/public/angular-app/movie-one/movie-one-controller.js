angular.module("meanMovies").controller("MovieOneController",MovieOneController);

function MovieOneController($location, $routeParams, MovieDataFactory,AuthFactory){
    console.log("MovieController is called");
    let vm=this;    
    const movieId = $routeParams.movieId;
    MovieDataFactory.getOneMovie(movieId).then(function(response) {
        vm.movie = response;
        vm.rating = _getStarRating(vm.movie.rate);
    })

    vm.deleteMovie=function(){
        MovieDataFactory.deleteOneMovie(movieId).then(function(response) {
            console.log("Movie Deleted");
            $location.path("/");
        }).catch(function(error) {
            console.log(error);
        })
    }

    vm.isLoggedIn = function() {
        return AuthFactory.auth.isLoggedIn;
    }
}

function _getStarRating(stars){
    return new Array(stars);
}
angular.module("meanMovies").controller("MovieOneController",MovieOneController);

function MovieOneController($http, $routeParams, MovieDataFactory){
    console.log("MovieController is called");
    let vm=this;
    const movieId = $routeParams.movieId;
    MovieDataFactory.getOneMovie($http,movieId).then(function(response) {
        vm.movie = response;
    })
}
angular.module("meanMovies").controller("MovieController",MovieController);

function MovieController($http, MovieDataFactory){
    console.log("MovieController is called");
    let vm=this;
    MovieDataFactory.getAllMovies($http).then(function(response) {
        vm.movies = response;
    })
}
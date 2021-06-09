angular.module("meanMovies").controller("MovieSearchController",MovieSearchController);

function MovieSearchController($route,$routeParams, $location, MovieDataFactory){
    console.log("MovieSearch Controller is called");
    let vm=this;    

    vm.searchMovie=function(){
        const searchMovie = {
            title: vm.searchMovieTitle,
            year: vm.searchMovieYear,
            rate: vm.searchMovieRating
        };
        MovieDataFactory.searchMovie(searchMovie).then(function(response) {
            console.log("Movies found");
            vm.movies = response;
        }).catch(function(error) {
            vm.err = "No result found";
            console.log(error);
        })
    } 
}


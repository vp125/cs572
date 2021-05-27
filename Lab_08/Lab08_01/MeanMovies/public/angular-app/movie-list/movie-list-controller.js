angular.module("meanMovies").controller("MovieController",MovieController);

function MovieController($route,MovieDataFactory){
    console.log("MovieController is called");
    let vm=this;
    vm.isSubmitted = false;

    MovieDataFactory.getAllMovies().then(function(response) {
        vm.movies = response;
    })

    vm.addMovie=function() {
        const newMovie= {
            title: vm.newMovieTitle,
            writer: vm.newMovieWriter,
            year: vm.newMovieYear,
            rating: vm.newMovieRating,            
        };
        if(vm.movieForm.$valid) {
            console.log(newMovie);
            MovieDataFactory.addOneMovie(newMovie).then(function(response) {
                console.log("Movie Saved");
                $route.reload();
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    }
}
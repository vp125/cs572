angular.module("meanMovies").directive("movieRating",MovieRating);

function MovieRating(){
    return {
        restrict: "E",
        templateUrl: "angular-app/movie-rating-directive/rating.html",
        bindToController: true,
        controller: "MovieOneController",
        controllerAs: "vm",
        scope: {
            stars : "@"
        }
    }
}
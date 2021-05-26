angular.module("meanMovies").factory("MovieDataFactory",MovieDataFactory);

function MovieDataFactory() {
    return {
        getAllMovies: getAllMovies,
        getOneMovie: getOneMovie
    };    
};

function getAllMovies($http) {
    return $http.get("/api/movies").then(complete).catch(failed);
}

function getOneMovie($http, movieId) {
    return $http.get("/api/movies/"+movieId).then(complete).catch(failed);
}

function complete(response){
    return response.data;
}

function failed(error) {
    return error.statusText;
}
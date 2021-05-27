angular.module("meanMovies").factory("MovieDataFactory",MovieDataFactory);

function MovieDataFactory($http) {
    return {
        getAllMovies: getAllMovies,
        getOneMovie: getOneMovie,
        addOneMovie: addOneMovie,
        deleteOneMovie: deleteOneMovie
    };    

    function getAllMovies() {
        return $http.get("/api/movies").then(complete).catch(failed);
    }
    
    function getOneMovie(movieId) {
        return $http.get("/api/movies/"+movieId).then(complete).catch(failed);
    }
    
    function addOneMovie(movie) {
        return $http.post("/api/movies",movie).then(complete).catch(failed);
    }

    function deleteOneMovie(movieId) {
        return $http.delete("/api/movies/"+movieId).then(complete).catch(failed);
    }
    
    function complete(response){
        return response.data;
    }
    
    function failed(error) {
        return error.statusText;
    }
};


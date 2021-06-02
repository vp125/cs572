angular.module("meanMovies").factory("MovieDataFactory",MovieDataFactory);

function MovieDataFactory($http) {
    return {
        getAllMovies: getAllMovies,
        getOneMovie: getOneMovie,
        addOneMovie: addOneMovie,
        deleteOneMovie: deleteOneMovie,
        searchMovie: searchMovie
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
    function searchMovie(movie){
        let query = "?";
        let flag = false;

        if(movie.title){
            query += "title="+movie.title;
            flag = true;
        }
        if(movie.year){
            if(flag) {
                query += "&";                
            }
            else {
                flag = true;
            }
            query += "year="+movie.year;
        }
        if(movie.rate){
            if(flag) {
                query += "&";                
            }            
            query += "rate="+movie.rate;
        }
        return $http.get("api/movies/search"+query).then(complete).catch(failed);
    }
    function complete(response){
        return response.data;
    }
    
    function failed(error) {
        return error.statusText;
    }
};


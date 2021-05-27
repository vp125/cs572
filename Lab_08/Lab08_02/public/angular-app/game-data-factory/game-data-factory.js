angular.module("meanGames").factory("GameDataFactory",GameDataFactory);

function GameDataFactory($http) {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        addOneGame: addOneGame,
        replaceOneGame: replaceOneGame,
        deleteOneGame: deleteOneGame
    };
    function getAllGames() {
        return $http.get("/api/games").then(complete).catch(failed);
    }
    
    function getOneGame(gameId) {
        return $http.get("/api/games/"+gameId).then(complete).catch(failed);
    }
    
    function addOneGame(game){
        return $http.post("/api/games",game).then(complete).catch(failed);
    }
    
    function replaceOneGame(gameId, game) {
        return $http.put("/api/games/"+gameId,game).then(complete).catch(failed);
    }

    function deleteOneGame(gameId) {
        return $http.delete("/api/games/"+gameId).then(complete).catch(failed);
    }
    function complete(response){
        return response.data;
    }
    
    function failed(error) {
        return error.status.statusText;
    }
};


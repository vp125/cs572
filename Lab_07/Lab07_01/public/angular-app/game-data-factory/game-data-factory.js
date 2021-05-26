angular.module("meanGames").factory("GameDataFactory",GameDataFactory);

function GameDataFactory() {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame
    };    
};

function getAllGames($http) {
    return $http.get("/api/games").then(complete).catch(failed);
}

function getOneGame($http, gameId) {
    return $http.get("/api/games/"+gameId).then(complete).catch(failed);
}

function complete(response){
    return response.data;
}

function failed(error) {
    return error.statusText;
}
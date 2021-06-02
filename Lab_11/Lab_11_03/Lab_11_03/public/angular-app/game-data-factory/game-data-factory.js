angular.module("meanGames").factory("GameDataFactory",GameDataFactory);

function GameDataFactory($http) {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        addOneGame: addOneGame,
        replaceOneGame: replaceOneGame,
        searchGame: searchGame
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

    function searchGame(game){
        let query = "?";
        let flag = false;

        if(game.title){
            query += "title="+game.title;
            flag = true;
        }
        if(game.year){
            if(flag) {
                query += "&";                
            }
            else {
                flag = true;
            }
            query += "year="+game.year;
        }
        if(game.rate){
            if(flag) {
                query += "&";                
            }            
            query += "rate="+game.rate;
        }
        return $http.get("api/games/search"+query).then(complete).catch(failed);
    }
    function complete(response){
        return response.data;
    }
    
    function failed(error) {
        return error.status.statusText;
    }
};


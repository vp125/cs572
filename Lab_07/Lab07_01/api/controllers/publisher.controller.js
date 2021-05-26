const mongoose= require("mongoose");
const Game= mongoose.model("Game");

const MAX_GAMES_DISPLAY= 7;

module.exports.publishersGetAll= function (req,res) {
    console.log("Publisher request received");
    //const db = dbConnection.get();
    const gameId= req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err,game){
        if(err) {
            console.log("Game ID not found in Database ",gameId);
            res.status(500).json(err);
        }
        else {
            console.log("Found publishers",game.publisher);
            res.status(200).json(game.publisher);
        }
    });
};

// module.exports.gamesGetOne= function(req,res) {
//     const gameId= req.params.gameId;
//     const gameData= gameData[gameId];
//     console.log("GET game with gameId ", gameId);
//     res.status(200).json(gameData);
// }

const _addPublisher= function(req,res,game,response) {
    if(game.publisher == null){
        game.publisher= {};
    }
    game.publisher.name= req.body.name;
    game.publisher.location.coordinates=
            [parseFloat(req.body.lng),parseFloat(req.body.lat)];
    game.save(function(err,updatedGame) {
        if(err) {
            response.status= 500;
            response.message= err;
        }
        else {
            response.message= updatedGame;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publishersAddOne= function(req,res) {
    console.log("Add one publisher to a game");
    const gameId= req.params.gameId;

    Game.findById(gameId).exec(function(err,game) {
        const response= {
            status: 201,
            message: game
        };
        if(err) {
            response.status= 500;
            response.message= err;
        }
        else if(!game) {
            console.log("Game ID not found in Database");
            response.status= 404;
            response.message= {"message":"Game ID not found " + gameId};

        }
        if(game) {
            _addPublisher(req,res,game,response);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}
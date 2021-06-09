const mongoose= require("mongoose");
const Game= mongoose.model("Game");

const MAX_GAMES_DISPLAY= 7;

module.exports.publishersGetAll= function (req,res) {
    console.log("GET Publisher request received");    
    const gameId= req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err,game){
        const response= {
            status: 200,
            message: game
        };
        if(err) {
            console.log("Game ID not found in Database ",gameId);
            response.status = 500;
            response.message = err;
            //res.status(500).json(err);
        }
        else {
            console.log("Found publishers",game.publisher);
            response.message = game.publisher;                        
        }
        res.status(response.status).json(response.message);
    });
};

const _addPublisher= function(req,res,game,response) {
    if(!game.publisher){
        game.publisher= {};
    }
    game.publisher.name= req.body.name;
    game.publisher.country = req.body.country;
    // game.publisher.location.coordinates=
    //         [parseFloat(req.body.lng),parseFloat(req.body.lat)];
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
    console.log("POST publisher to a game");
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

const _updatePublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    //game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.publisher.country = req.body.country;

    game.save(function (err, updatedGame) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); 
            response.status = 500; 
            response.message = err;
        }
        else {
            console.log("Update publisher successfully");
            response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
    });
}
   

module.exports.publishersFullUpdate = function (req, res) {
    const gameId = req.params.gameId;
    console.log("PUT publisher with gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); 
            response.status = 500; 
            response.message = err;
        } else if (!game) {
            response.status = 404; 
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _updatePublisher(req, res, game);
        }
    });
}

const _deletePublisher = function (req, res, game) {
    game.publisher.remove();
    game.save(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); 
            response.status = 500; 
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
    
module.exports.publishersDelete = function (req, res) {
    const gameId = req.params.gameId;
    console.log("DELETE publisher with gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); 
            response.status = 500; 
            response.message = err;
        } else if (!game) {
            response.status = 404; 
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _deletePublisher(req, res, game);
        }
    });
}

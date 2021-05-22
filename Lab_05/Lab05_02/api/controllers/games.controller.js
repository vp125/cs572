const mongoose= require("mongoose");
const Game= mongoose.model("Game");



module.exports.gamesGetAll= function (req,res) {
    console.log("GET Game request received");
    
    const maxCount= 7;
    let offset = 0;
    let count = maxCount;

    const response = {
        status: 200,
        message: ""
    };

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    // Type check
    if(isNaN(offset) || isNaN(count)){
        response.status = 400;
        response.message = {"message":"Query Offset and Count should be numbers"};        
    }

    // Limit check
    if(count > maxCount) {
        response.status = 400;
        response.message = {"message":"QueryString Count cannot exceed "+ maxCount};        
    }

    Game.find().skip(offset).limit(count).exec(function(err,games) {
        //Error check
        if(err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;            
        }
        else {
            console.log("Found games",games);            
            response.message = games;
        }
        res.status(response.status).json(response.message);
    });  
};

module.exports.gamesGetOne= function(req,res) {
    const gameId= req.params.gameId;

    const response = {
        status: 200,
        message: ""
    }
    Game.findById(gameId).exec(function(err,game) {
        if(err){
            console.log("Error finding game");
            //res.status(500).json(err);
            response.status = 500;
            response.message = err;
        }
        else if(!game) {
            console.log("Game ID not found ",gameId);
            //res.status(500).json({"message":"Game ID not found"});
            response.status = 500;
            response.message = "Game ID not found";
        }
        else {
            console.log("GET game with gameId ", gameId);
            response.message= game;         
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.gamesAddOne= function(req,res) {
    console.log("POST new game");
    const response = {
        status: 201,
        message: ""
    }
    if(req.body && req.body.title && req.body.price && req.body.rate){
        console.log(req.body);
        const newGame= {};
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.rate = parseInt(req.body.rate);

        //Type checking
        Game.create(newGame, function(err,game) {
            //Error checking
            if(err) {
                response.status= 500;
                response.message= err;    
            }
            else {
                response.message= game;        
            }
            res.status(response.status).json(response.message);    
        });
    }
    else {
        console.log("Data missing from POST body");
        response.status= 400;
        response.message= {error: "Data missing from POST body"};
        res.status(response.status).json(response.message);
    }    
}


module.exports.gamesFullUpdateOne= function(req,res) {
    console.log("PUT new game");
    const response = {
        status: 204,
        message: ""
    }

    const gameId= req.params.gameId;

    Game.findById(gameId).exec(function(err,game) {
        if(err){
            console.log("Error finding game");
            //res.status(500).json(err);
            response.status = 500;
            response.message = err;
        }
        else if(!game) {
            console.log("Game ID not found ",gameId);
            //res.status(500).json({"message":"Game ID not found"});
            response.status = 404;
            response.message = "Game ID not found";
        }

        if(response.status != 204){
            res.status(response.status).json(response.message);
        }
        else {
            // Update the game
            game.title = req.body.title;
            game.year = req.body.year;
            game.price = req.body.price;
            game.minPlayer = req.body.minPlayer;
            game.maxPlayer = req.body.maxPlayer;
            game.rate = req.body.rate;
            game.minAge = req.body.minAge;

            game.save(function(err,updatedGame) {
                if(err){
                    response.status= 500;
                    response.message= err;
                }
                else {
                    response.message= {"message":"Update successfully"};
                }
                res.status(response.status).json(response.message);
            });
        }        
    });


}

module.exports.gamesPartialUpdateOne= function(req,res) {
    console.log("PATCH new game");
    const response = {
        status: 204,
        message: ""
    }
    const gameId= req.params.gameId;

    Game.findById(gameId).exec(function(err,game) {
        if(err){
            console.log("Error finding game");
            //res.status(500).json(err);
            response.status = 500;
            response.message = err;
        }
        else if(!game) {
            console.log("Game ID not found ",gameId);
            //res.status(500).json({"message":"Game ID not found"});
            response.status = 404;
            response.message = "Game ID not found";
        }

        if(response.status != 204){
            res.status(response.status).json(response.message);
        }
        else {
            // Update the game
            if(req.body.title){
                game.title = req.body.title;
            }
            if(req.body.year) {
                game.year = req.body.year;
            }
            if(req.body.price) {
                game.price = req.body.price;
            }
            if(req.body.minPlayer) {
                game.minPlayer = req.body.minPlayer;
            }
            if(req.body.maxPlayer) {
                game.maxPlayer = req.body.maxPlayer;
            }
            if(req.body.rate){
                game.rate = req.body.rate;
            }
            if(req.body.minAge){
                game.minAge = req.body.minAge;
            }            

            game.save(function(err,updatedGame) {
                if(err){
                    response.status= 500;
                    response.message= err;
                }
                else {
                    response.message= {"message":"Update successfully"};
                }
                res.status(response.status).json(response.message);
            });            
        }        
    });
}


module.exports.gamesDeleteOne= function(req,res) {
    console.log("DELETE a game");
    const gameId= req.params.gameId;

    Game.findByIdAndRemove(gameId).exec(function(err,deletedGame) {
        const response = {
            status: 204,
            message: deletedGame
        }
        if(err){
            console.log("Error deleting game");
            //res.status(500).json(err);
            response.status = 500;
            response.message = err;
        }
        else if(!deletedGame) {
            console.log("Game ID not found ",gameId);          
            response.status = 500;
            response.message = "Game ID not found";
        }
        else {
            console.log("DELETE game with gameId ", gameId);
            response.message= deletedGame;        
        }
        res.status(response.status).json(response.message);
    });
}
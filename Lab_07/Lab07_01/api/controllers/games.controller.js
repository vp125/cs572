const mongoose= require("mongoose");
const Game= mongoose.model("Game");



module.exports.gamesGetAll= function (req,res) {
    console.log("Game request received");
    //const db = dbConnection.get();
    
    const MAX_GAMES_DISPLAY= 7;
    let offset = 0;
    let count = MAX_GAMES_DISPLAY;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        if(count > MAX_GAMES_DISPLAY) {
            count = MAX_GAMES_DISPLAY;
        }
    }
    // Type check
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"message":"Query Offset and Count should be numbers"});
    }

    // Limit check
    if(count > MAX_GAMES_DISPLAY) {
        res.status(400).json({
            "message":"QueryString Count cannot exceed "+ MAX_GAMES_DISPLAY
        });
    }

    Game.find().skip(offset).limit(count).exec(function(err,games) {
        if(err) {
            // Error check
            console.log("Error finding game");
            res.status(500).json(err);
        }
        else {
            console.log("Found games",games);
            res.status(200).json(games);
        }
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

module.exports.gameAddOne= function(req,res) {
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
            
        });
    }
    else {
        console.log("Data missing from POST body");
        response.status= 400;
        response.message= {error: "Data missing from POST body"};
    }    
    res.status(response.status).json(response.message);
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
            })
            console.log("GET game with gameId ", gameId);
            response.message= game;         
        }
        res.status(response.status).json(response.message);
    });



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
            
        });
    }
    else {
        console.log("Data missing from POST body");
        response.status= 400;
        response.message= {error: "Data missing from POST body"};
    }    
    res.status(response.status).json(response.message);
}

module.exports.gamesPartialUpdateOne= function(req,res) {
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
            })
            console.log("GET game with gameId ", gameId);
            response.message= game;         
        }
        res.status(response.status).json(response.message);
    });



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
            
        });
    }
    else {
        console.log("Data missing from POST body");
        response.status= 400;
        response.message= {error: "Data missing from POST body"};
    }    
    res.status(response.status).json(response.message);
}
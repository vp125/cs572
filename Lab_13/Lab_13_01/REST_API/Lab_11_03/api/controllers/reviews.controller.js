const mongoose= require("mongoose");
const Game= mongoose.model("Game");

const MAX_GAMES_DISPLAY= 7;

module.exports.reviewsGetAll= function (req,res) {
    console.log("GET Reviews request received");    
    const gameId= req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err,game){
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
            console.log("Found reviews",game.reviews);
            response.message = game.reviews;                        
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.reviewsGetOne= function (req,res) {
    console.log("GET Reviews request received");    
    const gameId= req.params.gameId;
    const reviewIndex= req.params.reviewIndex;

    Game.findById(gameId).select("reviews").exec(function(err,game){
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
            if(reviewIndex > (game.reviews.length -1)) {
                console.log("Found reviews",game.reviews);
                response.status = 400;
                response.message = {"message":"Out of review index"};
            }
            else {
                console.log("Found review",game.reviews[reviewIndex]);
                response.message = game.reviews[reviewIndex];                        
            }
            
        }
        res.status(response.status).json(response.message);
    });
};

const _addReview= function(req,res,game,response) {
    if(!game.reviews){
        game.reviews= [];
    }
    newReview = {};
    newReview.title = req.body.title;
    newReview.rating = req.body.rating;
    newReview.review = req.body.review;

    game.reviews.push(newReview);

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

module.exports.reviewsAddOne= function(req,res) {
    console.log("POST review to a game");
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
            _addReview(req,res,game,response);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}

const _updateReview = function (req, res, game, reviewIndex) {
    let reviews = game.reviews;
    const response = { status: 204 };

    if(reviewIndex > (reviews.length -1)){
        response.status = 400; 
        response.message = {"message":"Out of review index"};
    }
    else{
        let review = reviews[reviewIndex];
        review.title = req.body.title;
        review.rating = req.body.rating;
        review.review = req.body.review;

        game.save(function (err, updatedGame) {            
            if (err) {
                console.log("Error updating game"); 
                response.status = 500; 
                response.message = err;
            }
            else {
                console.log("Update review successfully");
                response.message = updatedGame;
            }
            res.status(response.status).json(response.message);
        });
    }
}

module.exports.reviewsFullUpdate = function (req, res) {
    const gameId = req.params.gameId;
    const reviewIndex = req.params.reviewIndex;    

    console.log("PUT review with gameId ", gameId);
    Game.findById(gameId).select("reviews").exec(function (err, game) {
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
            _updateReview(req, res, game, reviewIndex);
        }
    });
}

const _deleteReviewAll = function (req, res, game) {
    game.reviews = [];
    game.save(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); 
            response.status = 500; 
            response.message = err;
        }
        else {
            console.log("Delete reviews successfully");             
        }
        res.status(response.status).json(response.message);
    });
}


module.exports.reviewsDeleteAll = function (req, res) {
    const gameId = req.params.gameId;
    console.log("DELETE review with gameId ", gameId);
    Game.findById(gameId).select("reviews").exec(function (err, game) {
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
            _deleteReviewAll(req, res, game);
        }
    });
}
    
const _deleteReviewOne = function (req, res, game, reviewIndex) {
    const response = {status:200};
    if(reviewIndex > (game.reviews.length - 1)){
        response.status = 400;
        response.message = {"message":"Out of review index"};
    }
    else {
        game.reviews[reviewIndex].remove();
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

}

module.exports.reviewsDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    const reviewIndex = req.params.reviewIndex;

    console.log("DELETE review with gameId ",gameId, "with reviewIndex ", reviewIndex);
    Game.findById(gameId).select("reviews").exec(function (err, game) {
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
            _deleteReviewOne(req, res, game, reviewIndex);
        }
    });
}

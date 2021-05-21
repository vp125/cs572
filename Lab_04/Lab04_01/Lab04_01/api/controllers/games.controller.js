const mongoose= require("mongoose");
const Game= mongoose.model("Game");



module.exports.gamesGetAll= function (req,res) {
    console.log("Game request received");
    
    const MAX_GAMES_DISPLAY= 7;
    var offset = 0;
    var count = MAX_GAMES_DISPLAY;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        if(count > MAX_GAMES_DISPLAY) {
            count = MAX_GAMES_DISPLAY;
        }
    }
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"message": "QueryString Offset and Count should be numbers"});
    };

    Game.find().skip(offset).limit(count).exec(function(err,games) {
        if(err) {
            console.log("Error finding games");
            res.status(500).json(err);
        }
        console.log("Found games ",games.length);
        res.status(200).json(games);
    });  
};

module.exports.gamesGetOne= function(req,res) {
    const gameId= req.params.gameId;
    Game.findById(gameId).exec(function(err,game) {
        if(err){
            console.log("Error finding game");
            res.status(500).json(err);
        }
        else if(!game){
            console.log("Game ID not found");
            res.status(400).json({"message":"Game ID not found"});
        }
        else {
            res.status(200).json(game);
        }
    })    
}

// module.exports.gameAddOne= function(req,res) {
//     console.log("POST new game");
//     console.log(req.body);
//     res.status(200).json(req.body);
// }
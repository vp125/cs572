const dbConnection=require("../data/dbconnection");

const MAX_GAMES_DISPLAY = 7;

module.exports.gamesGetAll= function (req,res) {
    console.log("Game request received");
    const db = dbConnection.get();
    
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
    const collection= db.collection("games");

    collection.find().skip(offset).limit(count).toArray(function(err,docs) {
        console.log("Found games",docs);
        res.status(200).json(docs);
    });    
};

module.exports.gamesGetOne= function(req,res) {
    const gameId= req.params.gameId;
    const gameData= gameData[gameId];
    console.log("GET game with gameId ", gameId);
    res.status(200).json(gameData);
}

module.exports.gameAddOne= function(req,res) {
    console.log("POST new game");
    console.log(req.body);
    res.status(200).json(req.body);
}
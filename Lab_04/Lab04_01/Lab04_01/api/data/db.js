const mongoose=require("mongoose");
require("./games-model");

const dbName= "meanGames";
const dbURL= "mongodb://localhost:27017/"+dbName;

mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true});

// This is login into
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to "+dbURL);
})
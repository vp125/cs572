const mongoose=require("mongoose");
require("./games-model");

const dbName= "meanGamesGEO";
const dbURL= "mongodb://localhost:27017/"+dbName;

mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true,useFindAndModify:false});

// This is login into
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to "+dbURL);
})
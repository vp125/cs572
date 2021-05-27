const mongoose=require("mongoose");

const ActorSchema=new mongoose.Schema({
    name: String,    
    dob: Date
});

const MovieSchema=new mongoose.Schema( {
    title: String,
    writer: String,
    year: Number,    
    rating: {
        type: Number,
        min:1,
        max:5
    },
    actors: [ActorSchema]
});

mongoose.model("Movie",MovieSchema,"Movies");
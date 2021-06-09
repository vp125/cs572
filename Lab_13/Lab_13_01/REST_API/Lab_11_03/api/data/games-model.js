const mongoose=require("mongoose");

const reviewSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        "default": Date.now()
    }
});

const publisherSchema= new mongoose.Schema({
    name: String,
    country: String,
    location: {
        // type: {
        //     type: String,
        //     "default": "Point"
        // },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
});

const gameSchema= new mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    year: Number,    
    rate: {
        type:Number,
        min:1,
        max:5,
        "default":1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min:1,
        max:10,
    },
    maxPlayers: Number,
    minAge: Number,
    designers: [String],
    reviews: String,
    //reviews: String,
    publisher: publisherSchema
});

mongoose.model("Game",gameSchema,"games");
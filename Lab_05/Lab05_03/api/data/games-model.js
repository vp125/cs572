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
    rate: Number,
    rate: {
        type:Number,
        min:1,
        max:5,
        "default":1
    },
    price: Number,
    minPlayer: {
        type: Number,
        min:1,
        max:10,
    },
    maxPlayer: Number,
    minAge: Number,
    designers: [String],
    reviews: [reviewSchema],
    //reviews: String,
    publisher: publisherSchema
});

mongoose.model("Game",gameSchema,"games");
const mongoose=require("mongoose");

const LocationSchema=new mongoose.Schema({    
    city: {
        type:String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    zipCode: {
        type: Number,
        min:5
    }
    // ,
    // coodinators: {
    //     lng: Number,
    //     lat: Number
    // }    
}
)
const JobSchema=new mongoose.Schema( {
    title: {
        type: String,
        require: true
    },
    salary: { // per year
        type:Number,
        min:1000
    },        
    description: {
        type: String,
        require: true
    },
    experience: String,
    skills: {
        type: [String],
        require: true
    },
    postDate: {
        type: Date,   
        default: Date.now()
    },
    location: LocationSchema   
});

mongoose.model("Job",JobSchema,"Jobs");
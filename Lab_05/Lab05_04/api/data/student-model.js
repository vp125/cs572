const mongoose=require("mongoose");

const addressSchema= new mongoose.Schema( {
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String,
        length: 5
    }
})
const studentSchema= new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    gpa: Number,
    address: addressSchema 
});

mongoose.model("Student",studentSchema,"Students");
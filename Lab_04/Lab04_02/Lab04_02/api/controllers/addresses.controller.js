const mongoose= require("mongoose");
const Student= mongoose.model("Student");


module.exports.addressesGet= function (req,res) {
    console.log("Addresses request received");
    const studentId= req.params.studentId;
    Student.findById(studentId).select("address").exec(function(err,student) {
        if(err) {
            console.log("Error finding addresses");
            res.status(500).json(err);
        }
        else if(!student){
            console.log("Student id not found in database ");
            res.status(404).json({"message":"Student id not found"});
        }
        else{
            console.log("Found addresses ",student.address);
            res.status(200).json(student.address);
        }        
    });  
};
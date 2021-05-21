const mongoose= require("mongoose");
const Student= mongoose.model("Student");


module.exports.studentsGetAll= function (req,res) {
    console.log("Student request received");
    
    const MAX_STUDENTS_DISPLAY= 7;
    var offset = 0;
    var count = MAX_STUDENTS_DISPLAY;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        if(count > MAX_STUDENTS_DISPLAY) {
            count = MAX_STUDENTS_DISPLAY;
        }
    }
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"message": "QueryString Offset and Count should be numbers"});
    };

    Student.find().skip(offset).limit(count).exec(function(err,students) {
        if(err) {
            console.log("Error finding students");
            res.status(500).json(err);
        }
        console.log("Found students ",students.length);
        res.status(200).json(students);
    });  
};

module.exports.studentsGetOne= function(req,res) {
    const studentId= req.params.studentId;
    Student.findById(studentId).exec(function(err,student) {
        if(err){
            console.log("Error finding student");
            res.status(500).json(err);
        }
        else if(!student){
            console.log("student ID not found");
            res.status(400).json({"message":"student ID not found"});
        }
        else {
            res.status(200).json(student);
        }
    })    
}

// module.exports.gameAddOne= function(req,res) {
//     console.log("POST new game");
//     console.log(req.body);
//     res.status(200).json(req.body);
// }
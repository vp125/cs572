const mongoose= require("mongoose");
const Student= mongoose.model("Student");


module.exports.studentsGetAll= function (req,res) {
    console.log("Student request received");
    
    const maxCount= 7;
    var offset = 0;
    var count = maxCount;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        if(count > maxCount) {
            count = maxCount;
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

module.exports.studentsAddOne= function(req,res) {
    console.log("POST new student");
    const response = {
        status: 201,
        message: ""
    }
    if(req.body && req.body.name && req.body.gpa){
        let newStudent = {};
        newStudent.name = req.body.name;
        newStudent.gpa = parseFloat(req.body.gpa);
        newStudent.address = {};
        Student.create(newStudent, function(err,student) {
            //Error checking
            if(err) {
                console.log("Error adding new student");
                response.status = 500;
                response.message = {"message":"Error adding new student"};
            }
            else {
                console.log("Adding new student successfully");
                response.message = student;
            }
            res.status(response.status).json(response.message);
        })
    }
    else {
        console.log("Data is missing in POST body");
        response.status = 400;
        response.message = {"message":"Data is missing in POST body"};
        res.status(response.status).json(response.message);
    }

}

_updateStudent = function(req, res, student) {
    student.name = req.body.name;
    student.gpa = parseFloat(req.body.gpa);

    const response = {
        status: 204,
        message: ""
    }
    if(isNaN(student.gpa)){
        console.log("GPA must be a number");
        response.status = 400;
        response.message = {"message":"GPA must be a number"};
        res.status(response.status).json(response.message);
    }
    else {
        student.save(function(err, updatedStudent) {
            if(err) {
                console.log("Error updating student");
                response.status = 500;
                response.message = {"message":"Error updating student"};                
            }
            else {
                console.log("Update student successfully");
                response.message = updatedStudent;
            }
            res.status(response.status).json(response.message);
        })
    }
}
module.exports.studentsFullUpdate= function(req,res) {
    const studentId= req.params.studentId;
    const response = {
        status: 204,
        message: ""
    };
    Student.findById(studentId).exec(function(err,student) {
        if(err){
            console.log("Error finding student");
            response.status = 500;
            response.message = err;            
        }
        else if(!student){
            console.log("student ID not found");
            response.status = 400;
            response.message = {"message":"student ID not found"};
        }

        if(student) {
            _updateStudent(req,res,student);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}

module.exports.studentsDeleteOne= function(req,res) {
    const studentId= req.params.studentId;
    const response = {
        status: 204,
        message: ""
    };
    Student.findByIdAndRemove(studentId).exec(function(err,removedStudent) {
        if(err){
            console.log("Error finding student");
            response.status = 500;
            response.message = err;            
        }
        else{
            console.log("Remove student successfully");
            response.message = removedStudent;
        }
        res.status(response.status).json(response.message);
    });
}



const mongoose= require("mongoose");
const Student= mongoose.model("Student");


module.exports.addressesGet= function (req,res) {
    console.log("GET Addresses request received");
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

_addAddress = function(req, res, student) {
    if(!student.address) {
        student.address = {};
    }
    let address = student.address;
    address.street = req.body.street;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;

    student.save(function(err, savedStudent) {
        const response = {
            status: 204,
            message: savedStudent
        };

        if(err){
            console.log("Error adding address");
            response.status = 500;
            response.message = err;
        }
        else {
            console.log("Add address successfully");            
        }
        res.status(response.status).json(response.message);
    })
}
module.exports.addressesAddOne= function (req,res) {
    console.log("POST Addresses request received");
    const response = {
        status: 201,
        message: ""
    }
    if(req.body && req.body.street && req.body.city && req.body.state && req.body.zipCode) {
        const studentId= req.params.studentId;
        Student.findById(studentId).select("address").exec(function(err,student) {
            if(err) {
                console.log("Error finding addresses");
                response.status = 500;
                response.message = err;                
            }
            else if(!student){
                console.log("Student id not found in database ");
                response.status = 404;
                response.message = {"message":"Student id not found"};                
            }
            if(student){                
                _addAddress(req,res,student);                
            }        
            else {
                res.status(response.status).json(response.message);
            }
        });  
    }
    else {
        console.log("Data is missing in POST body");
        response.status = 400;
        response.message = {"message":"Data is missing in POST body"};
        res.status(response.status).json(response.message);
    }
};

_updateAddress = function(req, res, student) {
    let address = student.address;
    address.street = req.body.street;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;

    student.save(function(err, savedStudent) {
        const response = {
            status: 204,
            message: savedStudent
        };

        if(err){
            console.log("Error adding address");
            response.status = 500;
            response.message = err;
        }
        else {
            console.log("Update address successfully");            
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.addressesFullUpdate= function (req,res) {
    console.log("PUT Addresses request received");
    const response = {
        status: 204,
        message: ""
    }
    if(req.body && req.body.street && req.body.city && req.body.state && req.body.zipCode) {
        const studentId= req.params.studentId;
        Student.findById(studentId).select("address").exec(function(err,student) {
            if(err) {
                console.log("Error finding addresses");
                response.status = 500;
                response.message = err;                
            }
            else if(!student){
                console.log("Student id not found in database ");
                response.status = 404;
                response.message = {"message":"Student id not found"};                
            }
            if(student){                
                _updateAddress(req,res,student);                
            }        
            else {
                res.status(response.status).json(response.message);
            }
        });  
    }
    else {
        console.log("Data is missing in POST body");
        response.status = 400;
        response.message = {"message":"Data is missing in POST body"};
        res.status(response.status).json(response.message);
    }
};

_removeAddress = function(req, res, student) {
    student.address.remove();
    student.save(function(err, savedStudent) {
        const response = {
            status: 204,
            message: savedStudent
        };

        if(err){
            console.log("Error adding address");
            response.status = 500;
            response.message = err;
        }
        else {
            console.log("Delete address successfully");            
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.addressesDeleteOne= function (req,res) {
    console.log("DELETE Addresses request received");
    const response = {
        status: 201,
        message: ""
    }    
    const studentId = req.params.studentId;
    Student.findById(studentId).select("address").exec(function (err, student) {
        if (err) {
            console.log("Error finding addresses");
            response.status = 500;
            response.message = err;
        }
        else if (!student) {
            console.log("Student id not found in database ");
            response.status = 404;
            response.message = { "message": "Student id not found" };
        }
        if (student) {
            _removeAddress(req, res, student);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
};
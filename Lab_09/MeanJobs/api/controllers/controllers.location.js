const mongoose=require("mongoose");
const Job=mongoose.model("Job");

module.exports.getLocation=function(req,res) {
    console.log("GET All Location");
    const jobId = req.params.jobId;
    Job.findById(jobId,function(err,foundJob) {
        const resposne = {
            status: 200,
            message: foundJob
        };
        if(err) {
            console.log("Error founding job");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundJob) {
            console.log("Job not found with ID ",jobId);
            resposne.status = 404;
            resposne.message = {"message":"Job not found with ID ",jobId};
        }
        else {
            console.log("Locations found ",foundJob.location);
            resposne.message = foundJob.location;
        }
        res.status(resposne.status).json(resposne.message);
    });
}

_addLocation=function(req,res,job) {
    const response = {
        status:201,
        message: ""
    }
    if(req.body && req.body.city && req.body.state && req.body.zipCode){
        if(!job.location) {
            job.location = {};
        }
        job.location.city = req.body.city;
        job.location.state = req.body.state;
        job.location.zipCode = req.body.zipCode;
               
        job.save(function(err, updatedJob) {
            if(err) {
                const err_msg = "Error adding new location";
                console.log(err_msg);
                response.status = 500;
                response.message = err;
            }
            else {
                console.log("Succeed adding new location");
                response.message = updatedJob.locations;
            }
            res.status(response.status).json(response.message);
        });
    }
    else {
        const err_msg = "Data is missing in POST body";
        console.log(msg);
        response.status = 400;
        response.message = {"message":err_msg};
        res.status(response.status).json(response.message);
    }
}

module.exports.addLocation=function(req,res) {
    console.log("POST One Location");
    const jobId = req.params.jobId;
    Job.findById(jobId,function(err,foundJob) {
        const resposne = {
            status: 200,
            message: foundJob
        };
        if(err) {
            console.log("Error founding job");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundJob) {
            console.log("Job not found with ID ",jobId);
            resposne.status = 404;
            resposne.message = {"message":"Job not found with ID ",jobId};
        }
        else {            
            _addLocation(req,res,foundJob);            
        }        
    });
}

_updateFullLocation=function(req,res,job) {
    const response = {
        status: 204,
        message: ""
    };
    if(req.body && req.body.city && req.body.state && req.body.zipCode){
        job.location.city = req.body.city;
        job.location.state = req.body.state;
        job.location.zipCode = req.body.zipCode;

        job.save(function(err,updatedJob) {
            if(err){
                console.log("Error updating location");
                resposne.status = 500;
                resposne.message = err;
            }
            else{
                console.log("Succeed updating location");
                response.message = updatedJob.location;
            }
            res.status(response.status).json(response.message);
        });
    }
    else {
        const err_msg = "Data is missing in POST body";
        console.log(msg);
        response.status = 400;
        response.message = {"message":err_msg};
        res.status(response.status).json(response.message);
    }      
}

module.exports.updateFullLocation=function(req,res){
    console.log("PUT One Location");
    const jobId = req.params.jobId;

    Job.findById(jobId,function(err,foundJob) {
        const resposne = {
            status: 204,
            message: foundJob
        };
        if(err) {
            console.log("Error founding job");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundJob) {
            console.log("Job not found with ID ",jobId);
            resposne.status = 404;
            resposne.message = {"message":"Job not found with ID ",jobId};
        }
        if(resposne.status !=204){
            res.status(response.status).json(response.message);
        }
        else {         
            _updateFullLocation(req,res,foundJob);            
        }        
    });
}

_updatePartialLocation=function(req,res,job) {
    const response = {
        status: 204,
        message: ""
    };

    if(req.body && req.body.city){
        job.location.city = req.body.city;
    }
    if(req.body && req.body.state){
        job.location.state = req.body.state;
    }
    if(req.body && req.body.zipCode){
        job.location.zipCode = req.body.zipCode;
    }

    job.save(function (err, updatedJob) {
        if (err) {
            console.log("Error updating location");
            resposne.status = 500;
            resposne.message = err;
        }
        else {
            console.log("Succeed updating location");
            response.message = updatedJob.location;
        }
        res.status(response.status).json(response.message);
    });        
    
}

module.exports.updatePartialLocation=function(req,res){
    console.log("PATCH One Location");
    const jobId = req.params.jobId;

    Job.findById(jobId,function(err,foundJob) {
        const resposne = {
            status: 204,
            message: foundJob
        };
        if(err) {
            console.log("Error founding job");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundJob) {
            console.log("Job not found with ID ",jobId);
            resposne.status = 404;
            resposne.message = {"message":"Job not found with ID ",jobId};
        }
        if(resposne.status !=204){
            res.status(response.status).json(response.message);
        }
        else {         
            _updatePartialLocation(req,res,foundJob);            
        }        
    });
}

_deleteLocation=function(req,res,job) {
    const response = {
        status: 204,
        message: ""
    };
    job.locations = null;
    job.save(function (err, updatedJob) {
        if (err) {
            console.log("Error updating location");
            resposne.status = 500;
            resposne.message = err;
        }
        else {
            console.log("Succeed deleting locations");
            response.message = updatedJob.locations;
        }
        res.status(response.status).json(response.message);
    });        
}

module.exports.deleteLocation=function(req,res) {
    console.log("DELETE Location");
    const jobId = req.params.jobId;

    Job.findById(jobId,function(err,foundJob) {
        const resposne = {
            status: 204,
            message: foundJob
        };
        if(err) {
            console.log("Error founding job");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundJob) {
            console.log("Job not found with ID ",jobId);
            resposne.status = 404;
            resposne.message = {"message":"Job not found with ID ",jobId};
        }
        if(resposne.status !=204){
            res.status(response.status).json(response.message);
        }
        else {         
            _deleteLocation(req,res,foundJob);            
        }        
    });
}


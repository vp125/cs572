const mongoose=require("mongoose");
const Job=mongoose.model("Job");

module.exports.getAllJobs=function(req,res) {
    console.log("GET All Jobs");
    const maxCount=5;
    const offset=0;
    const count=maxCount;

    const response = {
        status: 201,
        message: ""
    };

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if(isNaN(offset) || isNaN(count)) {
        console.log("QueryString Offset and Count should be numbers");
        response.status = 400;
        response.message = {"message":"QueryString Offset and Count should be numbers"};
        res.status(response.status).json(response.message);
    }

    if(count > maxCount){
        console.log("QueryString Count should be equal or less than ",maxCount);
        response.status = 400;
        response.message = {"message":"QueryString Count should be equal or less than ",maxCount};
        res.status(response.status).json(response.message);
    }

    Job.find({}).exec(function(err,jobs) {
        const response = {
            status: 200,
            message: jobs
        }
        if(err) {
            console.log("Error finding job");
            response.status = 404,
            response.message = err; 
        }        
        else {
            console.log("jobs found");            
        }
        res.status(response.status).json(response.message);        
    });
}

module.exports.getOneJob=function(req,res) {
    console.log("GET One Job");
    const jobId = req.params.jobId;
    
    Job.findById(jobId, function(err,foundJob) {
        const response = {
            status: 200,
            message: foundJob
        };
        if(err) {
            console.log("Error finding job");
            response.status= 500;
            response.message= err;
        }
        else if(!foundJob){
            console.log("Job not found with jobId ",jobId);
            response.status= 404;
            response.message = {"message":"Job not found with jobId ",jobId};
        }
        else{
            console.log("Job found");            
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.addOneJob=function(req,res){
    console.log("POST a Job");
    const response = {
        status: 201,
        message: ""
    };

    if(req.body && req.body.title && req.body.salary && req.body.description 
    && req.body.experience && req.body.skills && req.body.postDate){
        let newJob = {};
        newJob.title = req.body.title;
        newJob.salary = parseFloat(req.body.salary);
        newJob.description = req.body.description;
        newJob.experience = req.body.experience;
        newJob.skills = req.body.skills;
        newJob.postDate = req.body.postDate;
        //newJob.location = {};

        if(isNaN(newJob.salary)) {
            console.log("Salary must be a number");
            response.status = 400;
            response.message = {"message":"Salary must be a number"};
            res.status(response.status).json(response.message);
        }
        else {
            //newJob.location = {};
            Job.create(newJob, function(err, addedJob) {
                if(err){
                    console.log("Error adding job");
                    response.status = 500;
                    response.message = err;
                }
                else {
                    console.log("Succeed adding job");
                    response.message = addedJob;
                }
                res.status(response.status).json(response.message);
            });
        }
    }
    else{
        console.log("Data is missing in POST body");
        response.status = 400;
        response.message = {"message":"Data is missing in POST body"};
        res.status(response.status),json(response.message);
    }
}

_updateFullJob=function(req,res,job){
    if(req.body && req.body.title && req.body.salary && req.body.description 
        && req.body.experience && req.body.skills && req.body.postDate){  
        job.title = req.body.title;
        job.salary = parseFloat(req.body.salary);
        job.description = req.body.description;
        job.experience = req.body.experience;
        job.skills = req.body.skills;
        job.postDate = req.body.postDate;

        if(isNaN(job.salary)) {
            console.log("Salary must be a number");
            response.status = 400;
            response.message = {"message":"Salary must be a number"};
            res.status(response.status).json(response.message);
        }
        else {
            job.save(function(err,updatedJob) {
                const response = {
                    status: 201,
                    message: updatedJob
                }
                if(err){
                    console.log("Error update Job");
                    response.status = 500;
                    response.message = err;
                }
                else{
                    console.log("Succeed update job");            
                }
                res.status(response.status).json(response.message);
            });
        }
    }
    else{
        console.log("Data is missing in POST body");
        response.status = 400;
        response.message = {"message":"Data is missing in POST body"};
        res.status(response.status),json(response.message);
    }
}
module.exports.updateFullOneJob=function(req,res) {
    console.log("PUT One Job");
    const jobId = req.params.jobId;
    
    Job.findById(jobId, function(err,foundJob) {
        const response = {
            status: 204,
            message: foundJob
        };
        if(err) {
            console.log("Error finding job");
            response.status= 404;
            response.message= err;
        }
        else if(!foundJob){
            console.log("Job not found with jobId ",jobId);
            response.status= 404;
            response.message = {"message":"Job not found with jobId ",jobId};
        }
        
        if(response.status !=204){
            res.status(response.status).json(response.message);    
        }
        else {
            console.log("Job found");
            _updateFullJob(req,res,foundJob);        
        }        
    });
}

_updatePartialJob=function(req,res,job){
    if(req.body){
        if(req.body.title){
            job.title = req.body.title;    
        }
        if(req.body.salary){
            job.salary = parseFloat(req.body.salary);    
        }
        if(req.body.description){
            job.description = req.body.description;    
        }
        if(req.body.experience){
            job.experience = req.body.experience;    
        }
        if(req.body.skills){
            job.skills = req.body.skills;    
        }
        if(req.body.postDate){
            job.postDate = req.body.postDate;    
        }
    } 
    if(isNaN(job.salary)) {
        console.log("Salary must be a number");
        response.status = 400;
        response.message = {"message":"Salary must be a number"};
        res.status(response.status).json(response.message);
    }
    else {
        job.save(function(err,updatedJob) {
            const response = {
                status: 201,
                message: updatedJob
            }
            if(err){
                console.log("Error update Job");
                response.status = 500;
                response.message = err;
            }
            else{
                console.log("Succeed update job");            
            }
            res.status(response.status).json(response.message);
        });
    }
}

module.exports.updatePartialOneJob=function(req,res) {
    console.log("PATCH One Job");
    const jobId = req.params.jobId;
    
    Job.findById(jobId, function(err,foundJob) {
        const response = {
            status: 204,
            message: foundJob
        };
        if(err) {
            console.log("Error finding job");
            response.status= 404;
            response.message= err;
        }
        else if(!foundJob){
            console.log("Job not found with jobId ",jobId);
            response.status= 404;
            response.message = {"message":"Job not found with jobId ",jobId};
        }
        if(response.status !=204){
            res.status(response.status).json(response.message);
        }
        else{
            console.log("Job found");
            _updatePartialJob(req,res,foundJob);        
        }        
    });
}

module.exports.deleteOneJob=function(req,res) {
    console.log("DELETE One Job");
    const jobId = req.params.jobId;
    
    Job.findByIdAndDelete(jobId, function(err,removedJob) {
        const response = {
            status: 204,
            message: removedJob
        };
        if(err) {
            console.log("Error deleting job");
            response.status= 404;
            response.message= err;
        }
        else{
            console.log("Job deleted");         
        }
        res.status(response.status).json(response.message);    
    });
}
angular.module("meanJobs").controller("JobOneController",JobOneController);

function JobOneController($location, $routeParams, JobDataFactory){
    console.log("JobController is called");
    let vm=this;    
    const jobId = $routeParams.jobId;
    JobDataFactory.getOneJob(jobId).then(function(response) {
        vm.job = response;
        vm.rating = _getStarRating(vm.job.rate);
    })

    vm.deleteJob=function(){
        JobDataFactory.deleteOneJob(jobId).then(function(response) {
            console.log("Job Deleted");
            $location.path("/");
        }).catch(function(error) {
            console.log(error);
        });
    }
}

function _getStarRating(stars){
    return new Array(stars);
}
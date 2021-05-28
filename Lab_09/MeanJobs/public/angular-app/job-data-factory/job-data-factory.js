angular.module("meanJobs").factory("JobDataFactory",JobDataFactory);

function JobDataFactory($http) {
    return {
        getAllJobs: getAllJobs,
        getOneJob: getOneJob,
        addOneJob: addOneJob,
        deleteOneJob: deleteOneJob
    };    

    function getAllJobs() {
        return $http.get("/api/jobs").then(complete).catch(failed);
    }
    
    function getOneJob(jobId) {
        return $http.get("/api/jobs/"+jobId).then(complete).catch(failed);
    }
    
    function addOneJob(job) {
        return $http.post("/api/jobs",job).then(complete).catch(failed);
    }

    function deleteOneJob(jobId) {
        return $http.delete("/api/jobs/"+jobId).then(complete).catch(failed);
    }
    
    function complete(response){
        return response.data;
    }
    
    function failed(error) {
        return error.statusText;
    }
};


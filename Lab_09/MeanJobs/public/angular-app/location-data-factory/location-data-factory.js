angular.module("meanJobs").factory("LocationDataFactory",LocationDataFactory);

function LocationDataFactory($http) {
    return {
        getLocation: getLocation,
        addLocation: addLocation,
        updateLocation: updateLocation,
        deleteLocation: deleteLocation
    };
    
    function getLocation(jobId) {
        return $http.get("/api/jobs/"+jobId+"/location").then(complete).catch(failed);
    }
    
    function addLocation(jobId,location) {
        return $http.post("/api/jobs/"+jobId+"/location",location).then(complete).catch(failed);
    }

    function updateLocation(jobId,location) {
        return $http.put("/api/jobs/"+jobId+"/location",location).then(complete).catch(failed);
    }

    function deleteLocation(jobId) {
        return $http.delete("/api/jobs/"+jobId+"/location").then(complete).catch(failed);
    }
    
    function complete(response){
        return response.data;
    }
    
    function failed(error) {
        return error.statusText;
    }
};


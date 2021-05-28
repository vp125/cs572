angular.module("meanJobs").controller("JobController",JobController);

function JobController($route,JobDataFactory){
    console.log("JobController is called");
    let vm=this;
    vm.isSubmitted = false;

    JobDataFactory.getAllJobs().then(function(response) {
        vm.jobs = response;
    })

    vm.addJob=function() {
        const newJob= {
            title: vm.newJobTitle,            
            salary: vm.newJobSalary,
            description: vm.newJobDescription,
            experience: vm.newJobExperience,
            skills: vm.newJobSkills.split(","),
            postDate: Date.now()         
        };
        if(vm.jobForm.$valid) {
            console.log(newJob);
            JobDataFactory.addOneJob(newJob).then(function(response) {
                console.log("Job Saved");
                $route.reload();
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    }
}
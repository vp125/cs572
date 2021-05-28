const express=require("express");
const router=express.Router();
const controllerJobs=require("../controllers/controllers.job");
const controllerLocation=require("../controllers/controllers.location");

router.route("/jobs")
    .get(controllerJobs.getAllJobs)
    .post(controllerJobs.addOneJob);

router.route("/jobs/:jobId")
    .get(controllerJobs.getOneJob)
    .put(controllerJobs.updateFullOneJob)
    .patch(controllerJobs.updatePartialOneJob)
    .delete(controllerJobs.deleteOneJob);

router.route("/jobs/:jobId/location")
    .get(controllerLocation.getLocation)
    .post(controllerLocation.addLocation)
    .put(controllerLocation.updateFullLocation)
    .patch(controllerLocation.updatePartialLocation)
    .delete(controllerLocation.deleteLocation);

module.exports = {
    router:router
};
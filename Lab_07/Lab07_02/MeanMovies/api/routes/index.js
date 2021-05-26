const express=require("express");
const router=express.Router();
const controllerMovies=require("../controllers/controllers.movie");
const controllerActors=require("../controllers/controllers.actor");

router.route("/movies")
    .get(controllerMovies.getAllMovies)
    .post(controllerMovies.addOneMovie);

router.route("/movies/:movieId")
    .get(controllerMovies.getOneMovie)
    .put(controllerMovies.updateFullOneMovie)
    .patch(controllerMovies.updatePartialOneMovie)
    .delete(controllerMovies.deleteOneMovie);

router.route("/movies/:movieId/actors")
    .get(controllerActors.getAllActors)
    .post(controllerActors.addOneActor)
    .delete(controllerActors.deleteAllActors);

router.route("/movies/:movieId/actors/:actorId")
    .get(controllerActors.getOneActor)
    .put(controllerActors.updateFullOneActor)
    .patch(controllerActors.updatePartialOneActor)
    .delete(controllerActors.deleteOneActor);


module.exports = {
    router:router
};
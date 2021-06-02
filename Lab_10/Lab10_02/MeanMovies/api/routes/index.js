const express=require("express");
const router=express.Router();
const controllerMovies=require("../controllers/movies.controller");
const controllerActors=require("../controllers/actors.controller");
const controllerUsers=require("../controllers/users.controller");

router.route("/movies")
    .get(controllerMovies.getAllMovies)
    .post(controllerUsers.authenticate,controllerMovies.addOneMovie);

router.route("/movies/search")
    .get(controllerMovies.searchMovies);

router.route("/movies/:movieId")
    .get(controllerMovies.getOneMovie)
    .put(controllerUsers.authenticate,controllerMovies.updateFullOneMovie)
    .patch(controllerUsers.authenticate,controllerMovies.updatePartialOneMovie)
    .delete(controllerUsers.authenticate,controllerMovies.deleteOneMovie);

router.route("/movies/:movieId/actors")
    .get(controllerActors.getAllActors)
    .post(controllerUsers.authenticate,controllerActors.addOneActor)
    .delete(controllerUsers.authenticate,controllerActors.deleteAllActors);

router.route("/movies/:movieId/actors/:actorId")
    .get(controllerActors.getOneActor)
    .put(controllerUsers.authenticate,controllerActors.updateFullOneActor)
    .patch(controllerUsers.authenticate,controllerActors.updatePartialOneActor)
    .delete(controllerUsers.authenticate,controllerActors.deleteOneActor);

router.route("/users")
    .post(controllerUsers.usersRegister);

router.route("/auth")
    .post(controllerUsers.usersAuthenticate);

module.exports = {
    router:router
};
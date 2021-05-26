const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/games.controller.js");
const controllerPublishers= require("../controllers/publisher.controller.js");

//router.route("/games").get(controllerGames.gamesGetAll).post(controllerGames.gameAddOne);
router.route("/games").get(controllerGames.gamesGetAll)
                      .post(controllerGames.gameAddOne);
router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesFullUpdateOne)
    .patch(controllerGames.gamesFullUpdateOne);

router.route("/games/:gameId/publishers")
    .get(controllerPublishers.publishersGetAll)
    .post(controllerPublishers.publishersAddOne);
module.exports=router;
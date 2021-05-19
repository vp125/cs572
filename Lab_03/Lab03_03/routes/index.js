const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/games.controller.js");

router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gameAddOne);

router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne);

module.exports=router;
const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/calculate.controller");

router.route("/add/:firstNum").get(controllerGames.addTwoNumber);

module.exports=router;
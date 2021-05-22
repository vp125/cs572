const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/games.controller.js");
const controllerPublishers= require("../controllers/publisher.controller.js");
const controllerReviews= require("../controllers/reviews.controller.js");

router.route("/games").get(controllerGames.gamesGetAll)
                      .post(controllerGames.gamesAddOne);
router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesFullUpdateOne)
    .patch(controllerGames.gamesPartialUpdateOne)
    .delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers")
    .get(controllerPublishers.publishersGetAll)
    .post(controllerPublishers.publishersAddOne)
    .put(controllerPublishers.publishersFullUpdate)
    .delete(controllerPublishers.publishersDelete);
    
router.route("/games/:gameId/reviews")
    .get(controllerReviews.reviewsGetAll)
    .post(controllerReviews.reviewsAddOne)
    .delete(controllerReviews.reviewsDeleteAll);

router.route("/games/:gameId/reviews/:reviewIndex")
    .get(controllerReviews.reviewsGetOne)
    .put(controllerReviews.reviewsFullUpdate)
    .delete(controllerReviews.reviewsDeleteOne);
module.exports=router;
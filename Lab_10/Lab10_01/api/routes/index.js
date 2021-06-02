const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/games.controller.js");
const controllerPublishers= require("../controllers/publisher.controller.js");
const controllerReviews= require("../controllers/reviews.controller.js");
const controllerUsers = require("../controllers/users.controller.js");

router.route("/games").get(controllerGames.gamesGetAll)
                      .post(controllerUsers.authenticate,controllerGames.gamesAddOne);

router.route("/games/search")
    .get(controllerGames.gamesSearch)

router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerUsers.authenticate,controllerGames.gamesFullUpdateOne)
    .patch(controllerUsers.authenticate,controllerGames.gamesPartialUpdateOne)
    .delete(controllerUsers.authenticate,controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers")
    .get(controllerPublishers.publishersGetAll)
    .post(controllerUsers.authenticate,controllerPublishers.publishersAddOne)
    .put(controllerUsers.authenticate,controllerPublishers.publishersFullUpdate)
    .delete(controllerUsers.authenticate,controllerPublishers.publishersDelete);
    
router.route("/games/:gameId/reviews")
    .get(controllerReviews.reviewsGetAll)
    .post(controllerUsers.authenticate,controllerReviews.reviewsAddOne)
    .delete(controllerUsers.authenticate,controllerReviews.reviewsDeleteAll);

router.route("/games/:gameId/reviews/:reviewIndex")
    .get(controllerReviews.reviewsGetOne)
    .put(controllerUsers.authenticate,controllerReviews.reviewsFullUpdate)
    .delete(controllerUsers.authenticate,controllerReviews.reviewsDeleteOne);

router.route("/users")
    .post(controllerUsers.usersRegister);

router.route("/auth")
    .post(controllerUsers.usersAuthenticate);

module.exports=router;
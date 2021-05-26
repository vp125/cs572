const mongoose=require("mongoose");
const Movie=mongoose.model("Movie");

module.exports.getAllActors=function(req,res) {
    console.log("GET All Actor");
    const movieId = req.params.movieId;
    Movie.findById(movieId,function(err,foundMovie) {
        const resposne = {
            status: 200,
            message: foundMovie
        };
        if(err) {
            console.log("Error founding movie");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundMovie) {
            console.log("Movie not found with ID ",movieId);
            resposne.status = 404;
            resposne.message = {"message":"Movie not found with ID ",movieId};
        }
        else {
            console.log("Actors found ",foundMovie.actors);
            resposne.message = foundMovie.actors;
        }
        res.status(resposne.status).json(resposne.message);
    });
}

module.exports.getOneActor=function(req,res) {
    console.log("GET One Actor");
    const movieId = req.params.movieId;
    const actorId = req.params.actorId;

    Movie.findById(movieId,function(err,foundMovie) {
        const resposne = {
            status: 200,
            message: foundMovie
        };
        if(err) {
            console.log("Error founding movie");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundMovie) {
            console.log("Movie not found with ID ",movieId);
            resposne.status = 404;
            resposne.message = {"message":"Movie not found with ID ",movieId};
        }
        else {
            let foundActor = foundMovie.actors.id(actorId);
            if(!foundActor){
                console.log("Actor not found with ID ",actorId);
                resposne.status = 404;
                resposne.message = {"message":"Actor not found with ID ",actorId};
            }
            else {
                console.log("Actor found with index",foundActor);
                resposne.message = foundActor;
            }            
        }
        res.status(resposne.status).json(resposne.message);
    });
}

_addOneActor=function(req,res,movie) {
    const response = {
        status:201,
        message: ""
    }
    if(req.body && req.body.name && req.body.dob){
        if(!movie.actors) {
            movie.actors = [];
        }
        const newActor = {};
        newActor.name = req.body.name;        
        newActor.dob = req.body.dob;

        movie.actors.push(newActor);
        movie.save(function(err, updatedMovie) {
            if(err) {
                const err_msg = "Error adding new actor";
                console.log(err_msg);
                response.status = 500;
                response.message = err;
            }
            else {
                console.log("Succeed adding new actor");
                response.message = updatedMovie.actors;
            }
            res.status(response.status).json(response.message);
        });
    }
    else {
        const err_msg = "Data is missing in POST body";
        console.log(msg);
        response.status = 400;
        response.message = {"message":err_msg};
        res.status(response.status).json(response.message);
    }
}

module.exports.addOneActor=function(req,res) {
    console.log("POST One Actor");
    const movieId = req.params.movieId;
    Movie.findById(movieId,function(err,foundMovie) {
        const resposne = {
            status: 200,
            message: foundMovie
        };
        if(err) {
            console.log("Error founding movie");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundMovie) {
            console.log("Movie not found with ID ",movieId);
            resposne.status = 404;
            resposne.message = {"message":"Movie not found with ID ",movieId};
        }
        else {            
            _addOneActor(req,res,foundMovie);            
        }        
    });
}

_updateFullOneActor=function(req,res,movie) {
    const actorId = req.params.actorId;
    const response = {
        status: 204,
        message: ""
    };

    let foundActor = movie.actors.id(actorId);
    if(!foundActor){
        console.log("Actor not found with ID ",actorId);
        resposne.status = 404;
        resposne.message = {"message":"Actor not found with ID ",actorId};
        res.status(response.status).json(response.message);
    }
    else {
        if(req.body && req.body.name && req.body.dob){
            foundActor.name = req.body.name;
            foundActor.dob = req.body.dob;
            movie.save(function(err,updatedMovie) {
                if(err){
                    console.log("Error updating actor");
                    resposne.status = 500;
                    resposne.message = err;
                }
                else{
                    console.log("Succeed updating actor");
                    response.message = updatedMovie.actors.id(actorId);
                }
                res.status(response.status).json(response.message);
            });
        }
        else {
            const err_msg = "Data is missing in POST body";
            console.log(msg);
            response.status = 400;
            response.message = {"message":err_msg};
            res.status(response.status).json(response.message);
        }
    }    
}

module.exports.updateFullOneActor=function(req,res){
    console.log("PUT One Actor");
    const movieId = req.params.movieId;

    Movie.findById(movieId,function(err,foundMovie) {
        const resposne = {
            status: 204,
            message: foundMovie
        };
        if(err) {
            console.log("Error founding movie");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundMovie) {
            console.log("Movie not found with ID ",movieId);
            resposne.status = 404;
            resposne.message = {"message":"Movie not found with ID ",movieId};
        }
        if(resposne.status !=204){
            res.status(response.status).json(response.message);
        }
        else {         
            _updateFullOneActor(req,res,foundMovie);            
        }        
    });
}

_updatePartialOneActor=function(req,res,movie) {
    const actorId = req.params.actorId;
    const response = {
        status: 204,
        message: ""
    };

    let foundActor = movie.actors.id(actorId);
    if(!foundActor){
        console.log("Actor not found with ID ",actorId);
        resposne.status = 404;
        resposne.message = {"message":"Actor not found with ID ",actorId};
        res.status(response.status).json(response.message);
    }
    else {
        if(req.body && req.body.name){
            foundActor.name = req.body.name;
        }
        if(req.body && req.body.dob){
            foundActor.dob = req.body.dob;
        }
        movie.save(function (err, updatedMovie) {
            if (err) {
                console.log("Error updating actor");
                resposne.status = 500;
                resposne.message = err;
            }
            else {
                console.log("Succeed updating actor");
                response.message = updatedMovie.actors.id(actorId);
            }
            res.status(response.status).json(response.message);
        });        
    }    
}

module.exports.updatePartialOneActor=function(req,res){
    console.log("PATCH One Actor");
    const movieId = req.params.movieId;

    Movie.findById(movieId,function(err,foundMovie) {
        const resposne = {
            status: 204,
            message: foundMovie
        };
        if(err) {
            console.log("Error founding movie");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundMovie) {
            console.log("Movie not found with ID ",movieId);
            resposne.status = 404;
            resposne.message = {"message":"Movie not found with ID ",movieId};
        }
        if(resposne.status !=204){
            res.status(response.status).json(response.message);
        }
        else {         
            _updatePartialOneActor(req,res,foundMovie);            
        }        
    });
}

_deleteAllActors=function(req,res,movie) {
    const response = {
        status: 204,
        message: ""
    };
    movie.actors = [];
    movie.save(function (err, updatedMovie) {
        if (err) {
            console.log("Error updating actor");
            resposne.status = 500;
            resposne.message = err;
        }
        else {
            console.log("Succeed deleting actors");
            response.message = updatedMovie.actors;
        }
        res.status(response.status).json(response.message);
    });        
}

module.exports.deleteAllActors=function(req,res) {
    console.log("DELETE All Actor");
    const movieId = req.params.movieId;

    Movie.findById(movieId,function(err,foundMovie) {
        const resposne = {
            status: 204,
            message: foundMovie
        };
        if(err) {
            console.log("Error founding movie");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundMovie) {
            console.log("Movie not found with ID ",movieId);
            resposne.status = 404;
            resposne.message = {"message":"Movie not found with ID ",movieId};
        }
        if(resposne.status !=204){
            res.status(response.status).json(response.message);
        }
        else {         
            _deleteAllActors(req,res,foundMovie);            
        }        
    });
}

_deleteOneActor=function(req,res,movie){
    const actorId = req.params.actorId;
    const response = {
        status: 204,
        message: ""
    };

    let foundActor = movie.actors.id(actorId);
    if (!foundActor) {
        console.log("Actor not found with ID ", actorId);
        resposne.status = 404;
        resposne.message = { "message": "Actor not found with ID ", actorId };
        res.status(response.status).json(response.message);
    }
    else {
        movie.actors = movie.actors.filter(item => item !== foundActor);    
        movie.save(function (err, updatedMovie) {
            if (err) {
                console.log("Error updating actor");
                resposne.status = 500;
                resposne.message = err;
            }
            else {
                console.log("Succeed updating actor");
                response.message = updatedMovie.actors.id(actorId);
            }
            res.status(response.status).json(response.message);
        });
    }

}
module.exports.deleteOneActor=function(req,res) {
    console.log("DELETE One Actor");
    const movieId = req.params.movieId;

    Movie.findById(movieId,function(err,foundMovie) {
        const resposne = {
            status: 204,
            message: foundMovie
        };
        if(err) {
            console.log("Error founding movie");
            resposne.status = 500;
            resposne.message = err;
        }
        else if(!foundMovie) {
            console.log("Movie not found with ID ",movieId);
            resposne.status = 404;
            resposne.message = {"message":"Movie not found with ID ",movieId};
        }
        if(resposne.status !=204){
            res.status(response.status).json(response.message);
        }
        else {         
            _deleteOneActor(req,res,foundMovie);            
        }        
    });
}


const mongoose=require("mongoose");
const Movie=mongoose.model("Movie");

module.exports.getAllMovies=function(req,res) {
    console.log("GET All Movies");
    const maxCount=5;
    const offset=0;
    const count=maxCount;

    const response = {
        status: 201,
        message: ""
    };

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if(isNaN(offset) || isNaN(count)) {
        console.log("QueryString Offset and Count should be numbers");
        response.status = 400;
        response.message = {"message":"QueryString Offset and Count should be numbers"};
        res.status(response.status).json(response.message);
    }

    if(count > maxCount){
        console.log("QueryString Count should be equal or less than ",maxCount);
        response.status = 400;
        response.message = {"message":"QueryString Count should be equal or less than ",maxCount};
        res.status(response.status).json(response.message);
    }

    Movie.find({}).exec(function(err,movies) {
        const response = {
            status: 200,
            message: movies
        }
        if(err) {
            console.log("Error finding game");
            response.status = 404,
            response.message = err; 
        }        
        else {
            console.log("Games found");            
        }
        res.status(response.status).json(response.message);        
    });
}

module.exports.getOneMovie=function(req,res) {
    console.log("GET One Movie");
    const movieId = req.params.movieId;
    
    Movie.findById(movieId, function(err,foundMovie) {
        const response = {
            status: 200,
            message: foundMovie
        };
        if(err) {
            console.log("Error finding movie");
            response.status= 500;
            response.message= err;
        }
        else if(!movie){
            console.log("Movie not found with movieId ",movieId);
            response.status= 404;
            response.message = {"message":"Movie not found with movieId ",movieId};
        }
        else{
            console.log("Movie found");            
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.addOneMovie=function(req,res){
    console.log("POST a Movie");
    const response = {
        status: 201,
        message: ""
    };

    if(req.body && req.body.title && req.body.writer && req.body.year && req.body.rating){
        let newMovie = {};
        newMovie.title = req.body.title;
        newMovie.writer = req.body.writer;
        newMovie.year = req.body.year;
        newMovie.actors = [];
        Movie.create(newMovie, function(err, addedMovie) {
            if(err){
                console.log("Error adding movie");
                response.status = 500;
                response.message = err;
            }
            else {
                console.log("Succeed adding movie");
                response.message = addedMovie;
            }
            res.status(response.status).json(response.message);
        });
    }
    else{
        console.log("Data is missing in POST body");
        response.status = 400;
        response.message = {"message":"Data is missing in POST body"};
        res.status(response.status),json(response.message);
    }
}

_updateFullMovie=function(req,res,movie){
    if(req.body && req.body.title && req.body.writer && req.body.year && req.body.rating){
        movie.title = req.body.title;
        movie.writer = req.body.writer;
        movie.year = req.body.year;
        movie.rating = req.body.rating;
    
        movie.save(function(err,updatedMovie) {
            const response = {
                status: 201,
                message: updatedMovie
            }
            if(err){
                console.log("Error update Movie");
                response.status = 500;
                response.message = err;
            }
            else{
                console.log("Succeed update movie");            
            }
            res.status(response.status).json(response.message);
        })
    }
    else{
        console.log("Data is missing in POST body");
        response.status = 400;
        response.message = {"message":"Data is missing in POST body"};
        res.status(response.status),json(response.message);
    }
}
module.exports.updateFullOneMovie=function(req,res) {
    console.log("PUT One Movie");
    const movieId = req.params.movieId;
    
    Movie.findById(movieId, function(err,foundMovie) {
        const response = {
            status: 204,
            message: foundMovie
        };
        if(err) {
            console.log("Error finding movie");
            response.status= 404;
            response.message= err;
        }
        else if(!foundMovie){
            console.log("Movie not found with movieId ",movieId);
            response.status= 404;
            response.message = {"message":"Movie not found with movieId ",movieId};
        }
        
        if(response.status !=204){
            res.status(response.status).json(response.message);    
        }
        else {
            console.log("Movie found");
            _updateFullMovie(req,res,foundMovie);        
        }        
    });
}

_updatePartialMovie=function(req,res,movie){
    if(req.body && req.body.title){
        movie.title = req.body.title;
    }
    if(req.body && req.body.writer) {
        movie.writer = req.body.writer;
    }
    if(req.body && req.body.year) {
        movie.year = req.body.year;
    }
    if(req.body && req.body.rating) {
        movie.rating = req.body.rating;
    }

    movie.save(function(err,updatedMovie) {
        const response = {
            status: 201,
            message: updatedMovie
        }
        if(err){
            console.log("Error update Movie");
            response.status = 500;
            response.message = err;
        }
        else{
            console.log("Succeed update movie");            
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.updatePartialOneMovie=function(req,res) {
    console.log("PATCH One Movie");
    const movieId = req.params.movieId;
    
    Movie.findById(movieId, function(err,foundMovie) {
        const response = {
            status: 204,
            message: foundMovie
        };
        if(err) {
            console.log("Error finding movie");
            response.status= 404;
            response.message= err;
        }
        else if(!foundMovie){
            console.log("Movie not found with movieId ",movieId);
            response.status= 404;
            response.message = {"message":"Movie not found with movieId ",movieId};
        }
        if(response.status !=204){
            res.status(response.status).json(response.message);
        }
        else{
            console.log("Movie found");
            _updatePartialMovie(req,res,foundMovie);        
        }        
    });
}

module.exports.deleteOneMovie=function(req,res) {
    console.log("DELETE One Movie");
    const movieId = req.params.movieId;
    
    Movie.findByIdAndDelete(movieId, function(err,removedMovie) {
        const response = {
            status: 204,
            message: removedMovie
        };
        if(err) {
            console.log("Error deleting movie");
            response.status= 404;
            response.message= err;
        }
        else{
            console.log("Movie deleted");         
        }
        res.status(response.status).json(response.message);    
    });
}
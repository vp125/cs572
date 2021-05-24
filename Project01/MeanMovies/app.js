require("./api/data/db");

const express=require("express");
const router=require("./api/routes");

const app=express();

app.set("port",3000);

app.use(express.json());

app.use(function(req,res,next) {
    console.log("Request method ",req.method," Request URL ",req.url);
    next();
});

app.use("/api",router.router);

const server = app.listen(app.get("port"), function() {
    console.log("Listening port ",server.address().port);
});
require("./api/data/db");

const path=require("path");

const express=require("express");
const router=require("./api/routes");

const app=express();

app.set("port",3000);

app.use(express.json());

app.use(function(req,res,next) {
    console.log("Request method ",req.method," Request URL ",req.url);
    next();
});
app.use(express.static(path.join(__dirname,"public")));
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));

app.use("/api",router.router);

const server = app.listen(app.get("port"), function() {
    console.log("Listening port ",server.address().port);
});
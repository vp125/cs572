const express=require("express");
const app=express();
const path=require("path");
const router=require("./routes");

app.set("port",5000);

app.use(function(req,res,next) {
    console.log(req.method, req.url);
    next();
});

app.use("/",router);

const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to port " + port);
})
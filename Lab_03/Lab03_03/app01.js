const express=require("express");
const app=express();
const path=require("path");
const router=require("./routes");
require("./data/dbconnection").open();

app.set("port",3000);

app.use(function(req,res,next) {
    console.log(req.method, req.url);
    next();
});

app.use("/css", function(req,res,next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));

app.use("/api",router);

const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to port " + port);
})